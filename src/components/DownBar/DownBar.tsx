import React from "react";
import styles from "./DownBar.module.scss";
import { AddIcon } from "@/assets/icons";
import { UploadPhotoInput } from "@/components/UploadPhoto/UploadPhotoInput";

export const DownBar = () => {
	return (
		<div className={styles.downBar}>
			<UploadPhotoInput label={<AddIcon />} className={styles.uploadPhotoInput} />
			<span className={styles.text}>Dodaj paragon</span>
		</div>
	);
};
