import React from "react";
import Link from "next/link";
import styles from "./ExtractingError.module.scss";
import { Logo } from "@/components/Logo/Logo";
import { UploadPhotoInput } from "@/components/UploadPhoto/UploadPhotoInput";

export const ExtractingError = () => {
	return (
		<div className={styles.wrapper}>
			<Logo width={39} height={29} />
			<p className={styles.info}>
				<span>Jeszcze raz.</span>
				<br />
				Nie znaleźliśmy danych z paragonu
			</p>
			<div className={styles.btnsWrapper}>
				<UploadPhotoInput label="Spróbuj ponownie" className={styles.uploadPhotoInput} />

				<Link href={"/dashboard"} className={styles.btnOutline}>
					Przejdź do strony głównej
				</Link>
			</div>
		</div>
	);
};
