import { generateObject, JSONParseError, TypeValidationError } from "ai";
import { z } from "zod";
import { openai } from "../../../openai.config";

const expenseSchema = z.array(
	z.object({
		name: z.string(),
		value: z.number(),
		currency: z.string(),
		date: z.string().datetime().describe("The date of the expense (ISO 8601 date string().)"),
		category: z.string(),
	}),
);

export type Expenses = z.infer<typeof expenseSchema>;

export const generateExpense = async (
	prompt: string,
	imgUrl: string,
): Promise<
	| { type: "success"; expenses: Expenses }
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

		if (resp.object.length === 0) {
			return { type: "validation-error", value: "No expenses found" };
		}

		return { type: "success", expenses: resp.object };
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
