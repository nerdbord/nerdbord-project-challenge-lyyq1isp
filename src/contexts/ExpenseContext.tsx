"use client";

import {
	createContext,
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	useContext,
	useState,
} from "react";

type Expense = {
	name: string;
	date: string;
	category: string;
	value: number;
	currency: string;
};

interface ExpenseContextProps {
	setExpenses: Dispatch<SetStateAction<Expense[]>>;
	expenses: Expense[];
}

const ExpenseContext = createContext<ExpenseContextProps | undefined>(undefined);

export const ExpenseProvider = ({ children }: PropsWithChildren) => {
	const [expenses, setExpenses] = useState<Expense[]>([]);

	return (
		<ExpenseContext.Provider value={{ expenses, setExpenses }}>{children}</ExpenseContext.Provider>
	);
};

export const useExpenseContext = () => {
	const context = useContext(ExpenseContext);

	if (!context) {
		throw new Error("useExpenseContext must be used within an ExpenseProvider");
	}

	return context;
};
