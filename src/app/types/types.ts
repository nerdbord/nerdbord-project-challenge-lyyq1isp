export type Expense = {
	name: string;
	category: string;
	price: string;
	currency: string;
	id: number;
	value: number;
};
export type ReceiptDataType = {
	expenses: Expense[];
};
