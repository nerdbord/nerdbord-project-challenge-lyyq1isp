"use client";
import { useEffect, useState } from "react";
import { ChangeMonths } from "./ChangeMonths/ChangeMonths";
import { type Expense } from "@/app/types/types";

export type CurrentDate = {
	month: number;
	year: number;
};
type Statistic = {
	expenses: Expense[];
};
const Statistic = ({ expenses }: Statistic) => {
	const [currentDate, setCurrentDate] = useState<CurrentDate>({
		month: 0,
		year: 2024,
	});
	const calculateTotalSum = (expenses: Expense[]): number => {
		return expenses.reduce((total, expense) => total + expense.value, 0);
	};

	const calculateSumByCategory = (expenses: Expense[]): Record<string, number> => {
		return expenses.reduce(
			(sums, expense) => {
				if (!sums[expense.category]) {
					sums[expense.category] = 0;
				}
				sums[expense.category] += expense.value;
				return sums;
			},
			{} as Record<string, number>,
		);
	};
	useEffect(() => {
		const date = new Date();
		const month = date.getMonth();
		const year = date.getFullYear();

		setCurrentDate({
			month: month,
			year: year,
		});
	}, []);
	const sumByCategory = calculateSumByCategory(expenses);
	return (
		<div style={{ paddingTop: "200px" }}>
			<p>Moje statystyki</p>
			<div>
				<ChangeMonths date={currentDate} changeCurrentDate={setCurrentDate} />
			</div>
			<div>
				<p>Wydana kwota</p>
				<p>{calculateTotalSum(expenses)}</p>
			</div>
			<ul>
				{Object.entries(sumByCategory).map(([category, sum]) => (
					<li key={category}>
						{category}: ${sum.toFixed(2)}
					</li>
				))}
			</ul>
		</div>
	);
};

export { Statistic };
