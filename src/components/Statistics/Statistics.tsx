"use client";
import { useEffect, useState } from "react";
import { ChangeMonths } from "./ChangeMonths/ChangeMonths";
import styles from "./Statistics.module.scss";
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
	const randomColor = (sum: number) => {
		const r = Math.random() * 255;
		const g = Math.random() * 255;
		const b = Math.random() * 255;

		return { backgroundColor: `rgb(${r},${g},${b})`, width: `${sum}px` };
	};
	const sumByCategory = calculateSumByCategory(expenses);
	return (
		<div style={{ paddingTop: "200px" }}>
			<p>Moje statystyki</p>
			<div>
				<ChangeMonths date={currentDate} changeCurrentDate={setCurrentDate} />
			</div>
			<div className={styles.sumOfExpenses}>
				<p className={styles.textSumOfExpenses}>Wydana kwota</p>
				<h4 className={styles.sum}>{calculateTotalSum(expenses)}</h4>
			</div>
			<ul className={styles.list}>
				{Object.entries(sumByCategory).map(([category, sum]) => (
					<li key={category}>
						<span>{category}</span>
						<div style={randomColor(sum)}></div>
						<span>{sum.toFixed(2)}zł</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export { Statistic };
