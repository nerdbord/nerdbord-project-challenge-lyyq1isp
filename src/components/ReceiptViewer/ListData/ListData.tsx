"use client";
import { type ChangeEvent, useState } from "react";
import { type Expense } from "@/app/types/types";

type ListDataProps = {
	edit: boolean;
};

const ListData = ({ edit }: ListDataProps) => {
	const [receiptData, setReceiptData] = useState<Expense[]>([
		{ name: "Karma", category: "Kot", price: "12,99", currency: "pln", id: 1 },
		{
			name: "Żwir",
			category: "Pies",
			price: "15,99",
			currency: "pln",
			id: 2,
		},
	]);
	const categories = ["dom", "inne", "podstawowe"];
	const handleEdit = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: number) => {
		const { name, value } = event.target;
		setReceiptData((prevData) =>
			prevData.map((element) => {
				if (element.id === id) {
					return {
						...element,
						[name]: value,
					};
				}
				return element;
			}),
		);
	};
	return (
		<div>
			{receiptData.map((expense) => {
				return (
					<div key={expense.id}>
						<input
							type="text"
							onChange={(event) => {
								handleEdit(event, expense.id);
							}}
							disabled={edit}
							value={expense.name}
							name="name"
						/>
						<select
							disabled={edit}
							name="category"
							value={expense.category}
							onChange={(event) => {
								handleEdit(event, expense.id);
							}}
						>
							{categories.map((category, index) => {
								return (
									<option key={index} value={category}>
										{category}
									</option>
								);
							})}
						</select>
						<input
							type="text"
							disabled={edit}
							name="price"
							value={expense.price}
							onChange={(event) => {
								handleEdit(event, expense.id);
							}}
						/>
						<input
							type="text"
							disabled={edit}
							name="currency"
							value={expense.currency}
							onChange={(event) => {
								handleEdit(event, expense.id);
							}}
						/>
					</div>
				);
			})}
		</div>
	);
};

export { ListData };
