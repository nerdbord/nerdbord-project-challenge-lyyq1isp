"use client";

import React, { useState } from "react";

import styles from "./CreateExpense.module.scss";
import { extractExpansesFromReceipt } from "@/app/api/actions/extractExpansesFromReceipt";
import { type Expense } from "@/services/gpt/gpt.service";
import { UploadPhotoInput } from "@/ui/UploadPhoto/UploadPhotoInput";
import { UploadPhotoPreview } from "@/ui/UploadPhoto/UploadPhotoPreview";

export const CreateExpense = () => {
	const [imageURLs, setImageURLs] = useState<string[]>([]);
	const [expense, setExpense] = useState<Expense | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	console.log("imageURLs", imageURLs);

	const handleExtractExpense = async () => {
		setIsLoading(true);

		try {
			const expense = await extractExpansesFromReceipt(imageURLs);

			if (expense) {
				setExpense(expense);
				setImageURLs([]);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const removeImage = (idx: number) => {
		setImageURLs((prev) => prev.filter((_, i) => i !== idx));
	};

	if (!expense) {
		return (
			<div className={styles.wrapper}>
				<div className={styles.previewGallery}>
					{imageURLs.map((imageURL, idx) => (
						<UploadPhotoPreview key={idx} imageURL={imageURL} onRemove={() => removeImage(idx)} />
					))}
				</div>

				<div className={styles.btnsWrapper}>
					<UploadPhotoInput setImageURLs={setImageURLs} label="Dodaj zdjęcie" />
					<button
						className={styles.extractButton}
						onClick={handleExtractExpense}
						disabled={isLoading || imageURLs.length === 0}
					>
						{isLoading ? "Ładowanie..." : "Wyciągnij dane"}
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.wrapper}>
			{/* TODO: change with expenses list component */}
			{expense && (
				<div>
					<h2>Expense</h2>
					<pre>{JSON.stringify(expense, null, 2)}</pre>
				</div>
			)}
		</div>
	);
};
