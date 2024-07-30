import { useState } from "react";
import styles from "./UploadPhotoInput.module.scss";

type UploadPhotoProps = {
	setImageURLs: React.Dispatch<React.SetStateAction<string[]>>;
	label?: string;
};

export const UploadPhotoInput = ({ setImageURLs, label }: UploadPhotoProps) => {
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null);
		const files = Array.from(e.target.files || []);

		const validFiles = files.filter(
			(file) =>
				file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg",
		);

		if (validFiles.length === 0) {
			setError("No valid images were selected (only PNG, JPG, and JPEG are allowed).");
			console.log("No valid images were selected (only PNG, JPG, and JPEG are allowed).");
			return;
		}

		if (validFiles.length !== files.length) {
			setError(
				"Some files were not valid images (only PNG, JPG, and JPEG are allowed) and were ignored.",
			);
			console.log(
				"Some files were not valid images (only PNG, JPG, and JPEG are allowed) and were ignored.",
			);
		}

		validFiles.forEach((file) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				setImageURLs((prev) => [...prev, reader.result as string]);
			};
		});

		setError(null);
	};

	return (
		<div className={styles.uploadButtonWrapper}>
			<label className={styles.uploadButton}>
				{label}
				<input type="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange} multiple />
			</label>
			{error && <p className={styles.errorText}>{error}</p>}
		</div>
	);
};
