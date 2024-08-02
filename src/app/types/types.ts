export type Expense = {
	name: string;
	category: string;
	price: string;
	currency: string;
	id: number;
};
export type ReceiptDataType = {
	expenses: Expense[];
};
