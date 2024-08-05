import { z } from "zod";

const gptExpenseItemSchema = z.object({
	name: z.string(),
	value: z.number(),
	currency: z.string(),
	date: z.string().datetime().describe("The date of the expense (ISO 8601 date string().)"),
	category: z.string(),
});

export const gptExpenseSchema = z.object({
	expenses: z.array(gptExpenseItemSchema),
});

export type GptExpenseItem = z.infer<typeof gptExpenseItemSchema>;
export type GptExpense = z.infer<typeof gptExpenseSchema>;
