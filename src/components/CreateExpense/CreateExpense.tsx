"use client";

import React, { useState } from "react";

import { extractExpansesFromReceipt } from "@/app/api/actions/extractExpansesFromReceipt";
import { type Expense } from "@/services/gpt/gpt.service";
import { UploadPhoto } from "@/components/UploadPhoto/UploadPhoto";

export const CreateExpense = () => {
	const [imagesSrc, setImagesSrc] = useState<string[]>([]);
	const [expense, setExpense] = useState<Expense | null>(null);

	const handleExtractExpense = async () => {
		const expense = await extractExpansesFromReceipt(imagesSrc);

		if (expense) {
			setExpense(expense);
		}
	};

	return (
		<div>
			<h1>Create expense</h1>
			<div>
				<UploadPhoto imagesSrc={imagesSrc} setImagesSrc={setImagesSrc} />
			</div>
			<div>
				<button onClick={handleExtractExpense}>Extract expense</button>
				{expense && (
					<div>
						<h2>Expense</h2>
						<pre>{JSON.stringify(expense, null, 2)}</pre>
					</div>
				)}
			</div>
		</div>
	);
};
