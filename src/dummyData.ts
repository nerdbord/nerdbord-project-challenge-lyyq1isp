import { type Expense } from "@/types/expense.types";

export const dummyCategories = ["Elektronika", "Odzież", "Sport", "Książki"];

export const dummyExpenses: Expense[] = [
	{
		id: "a1b2c3d4e5f6g7",
		name: "Laptop",
		date: "2023-07-15T00:00:00.000Z",
		category: "Elektronika",
		value: 3500.0,
		currency: "PLN",
	},
	{
		id: "h8i9j0k1l2m3n4",
		name: "Telefon",
		date: "2023-06-10T00:00:00.000Z",
		category: "Elektronika",
		value: 5000.0,
		currency: "PLN",
	},
	{
		id: "o5p6q7r8s9t0u1",
		name: "Buty sportowe",
		date: "2023-05-20T00:00:00.000Z",
		category: "Odzież",
		value: 900.0,
		currency: "PLN",
	},
	{
		id: "v2w3x4y5z6a7b8",
		name: "Rower",
		date: "2023-04-25T00:00:00.000Z",
		category: "Sport",
		value: 3000.0,
		currency: "PLN",
	},
	{
		id: "c9d0e1f2g3h4i5",
		name: "Książka",
		date: "2023-03-15T00:00:00.000Z",
		category: "Książki",
		value: 200.0,
		currency: "PLN",
	},
	{
		id: "j6k7l8m9n0o1p2",
		name: "Monitor",
		date: "2023-02-05T00:00:00.000Z",
		category: "Elektronika",
		value: 1600.0,
		currency: "PLN",
	},
];
