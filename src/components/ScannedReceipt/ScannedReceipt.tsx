"use client";

import { useState } from "react";
import { Heading } from "./Heading/Heading";
import { ReceiptList } from "./ReceiptList/ReceiptList";
import { dummyCategories, dummyExpenses } from "@/dummyData";
import { type Expense } from "@/types/expense.types";
// import { useExpenseContext } from "@/contexts/ExpenseContext";

const ScannedReceipt = () => {
	const [expenses, setExpenses] = useState<Expense[]>(dummyExpenses);
	const [categories, setCategories] = useState<string[]>(dummyCategories);

	return (
		<>
			<Heading />
			<ReceiptList
				expenses={expenses}
				categories={categories}
				setExpenses={setExpenses}
				setCategories={setCategories}
			/>
		</>
	);
};

export { ScannedReceipt };
