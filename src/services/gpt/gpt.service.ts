import { generateObject, JSONParseError, TypeValidationError } from "ai";
import { openai } from "../../../openai.config";
import { type GptExpense, gptExpenseSchema } from "@/types/gpt.types";

export const generateExpense = async (
	prompt: string,
	imgUrl: string,
): Promise<
	| { type: "success"; expenses: GptExpense }
	| { type: "parse-error"; text: string }
	| { type: "validation-error"; value: unknown }
	| { type: "unknown-error"; error: unknown }
> => {
	try {
		const resp = await generateObject({
			model: openai("gpt-4o"),
			schema: gptExpenseSchema,
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

		if (resp.object.expenses.length === 0) {
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
