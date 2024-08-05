"use client";

import {
	createContext,
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	useContext,
	useState,
} from "react";
import { type Expense } from "@/types/expense.types";

interface ExpenseContextProps {
	setExpenses: Dispatch<SetStateAction<Expense[]>>;
	expenses: Expense[];
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	isError: boolean;
	setIsError: Dispatch<SetStateAction<boolean>>;
}

const ExpenseContext = createContext<ExpenseContextProps | undefined>(undefined);

export const ExpenseProvider = ({ children }: PropsWithChildren) => {
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	return (
		<ExpenseContext.Provider
			value={{ expenses, setExpenses, isLoading, setIsLoading, isError, setIsError }}
		>
			{children}
		</ExpenseContext.Provider>
	);
};

export const useExpenseContext = () => {
	const context = useContext(ExpenseContext);

	if (!context) {
		throw new Error("useExpenseContext must be used within an ExpenseProvider");
	}

	return context;
};
