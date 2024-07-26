import { openai } from "@ai-sdk/openai";
import { generateObject, JSONParseError, TypeValidationError } from "ai";
import { z } from "zod";

const expenseSchema = z.object({
	expenses: z.array(
		z.object({
			name: z.string(),
			category: z.string(),
			amount: z.number(),
		}),
	),
	date: z.string().datetime().describe("The date of the expense (ISO 8601 date string().)"),
});

type Expense = z.infer<typeof expenseSchema>;

export const generateExpense = async (
	prompt: string,
	imgUrl: string,
): Promise<
	| { type: "success"; expense: Expense }
	| { type: "parse-error"; text: string }
	| { type: "validation-error"; value: unknown }
	| { type: "unknown-error"; error: unknown }
> => {
	try {
		const resp = await generateObject({
			model: openai("gpt-4o"),
			schema: expenseSchema,
			messages: [
				{
					role: "user",
					content: [
						{ type: "text", text: prompt },
						{ type: "image", image: imgUrl },
					],
				},
			],
		});

		return { type: "success", expense: resp.object };
	} catch (error) {
		if (TypeValidationError.isTypeValidationError(error)) {
			return { type: "validation-error", value: error.value };
		} else if (JSONParseError.isJSONParseError(error)) {
			return { type: "parse-error", text: error.text };
		} else {
			return { type: "unknown-error", error };
		}
	}
};
