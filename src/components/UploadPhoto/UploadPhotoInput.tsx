"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./UploadPhotoInput.module.scss";
import { extractExpansesFromReceipt } from "@/app/api/actions/extractExpansesFromReceipt";
import { useExpenseContext } from "@/contexts/ExpenseContext";

type UploadPhotoProps = {
	label?: React.ReactNode;
	className?: string;
};

export const UploadPhotoInput = ({ label, className }: UploadPhotoProps) => {
	const [imageURL, setImageURL] = useState<string>("");
	const { setExpenses, setIsLoading, setIsError } = useExpenseContext();
	const router = useRouter();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;

		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			setImageURL(reader.result as string);
		};
	};

	useEffect(() => {
		const handleExtractExpense = async (): Promise<void> => {
			setIsLoading(true);
			setIsError(false);
			try {
				const expense = await extractExpansesFromReceipt(imageURL);

				if (expense) {
					setExpenses(expense.expenses);
					setImageURL("");

					router.push("/confirm-expenses");
				}
			} catch (error) {
				console.log(error);
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};

		if (imageURL) {
			void handleExtractExpense();
		}
	}, [imageURL]);

	return (
		<label className={className}>
			{label}
			<input
				className={styles.uploadInput}
				type="file"
				accept=".png, .jpg, .jpeg"
				onChange={handleFileChange}
			/>
		</label>
	);
};
