import { generateObject, JSONParseError, TypeValidationError } from "ai";
import { z } from "zod";
import { openai } from "../../../openai.config";

const expenseSchema = z.object({
	expenses: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			category: z.string(),
			price: z.number().refine((val) => Number(val.toFixed(2)) === val),
			currency: z.string(),
		}),
	),
	date: z.string().datetime(),
});

export type Expense = z.infer<typeof expenseSchema>;

export const generateExpense = async (
	prompt: string,
	imgUrls: string[],
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
						...imgUrls.map((url) => ({ type: "image" as const, image: url })),
					],
				},
			],
		});

		if (resp.object.expenses.length === 0) {
			return { type: "validation-error", value: "No expenses found" };
		}

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
