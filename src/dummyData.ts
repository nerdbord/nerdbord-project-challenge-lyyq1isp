import { type Expense } from "@/types/expense.types";

export const dummyCategories = ["Elektronika", "Odzież", "Sport", "Książki"];

export const dummyExpenses: Expense[] = [
	{
		name: "Laptop",
		date: "2023-07-15T00:00:00.000Z",
		category: "Elektronika",
		value: 3500.0,
		currency: "PLN",
	},
	{
		name: "Telefon",
		date: "2023-06-10T00:00:00.000Z",
		category: "Elektronika",
		value: 5000.0,
		currency: "PLN",
	},
	{
		name: "Buty sportowe",
		date: "2023-05-20T00:00:00.000Z",
		category: "Odzież",
		value: 900.0,
		currency: "PLN",
	},
	{
		name: "Rower",
		date: "2023-04-25T00:00:00.000Z",
		category: "Sport",
		value: 3000.0,
		currency: "PLN",
	},
	{
		name: "Książka",
		date: "2023-03-15T00:00:00.000Z",
		category: "Książki",
		value: 200.0,
		currency: "PLN",
	},
	{
		name: "Monitor",
		date: "2023-02-05T00:00:00.000Z",
		category: "Elektronika",
		value: 1600.0,
		currency: "PLN",
	},
];
