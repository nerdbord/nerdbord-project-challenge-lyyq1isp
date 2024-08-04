import React from "react";
import styles from "./ExtractingProgress.module.scss";
import { Logo } from "@/components/Logo/Logo";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";

export const ExtractingProgress = () => {
	return (
		<div className={styles.wrapper}>
			<Logo width={80} height={58} />
			<p className={styles.info}>
				Chwileczkę <span>złotko</span>, przetwarzamy <span>Twój paragon</span>
			</p>
			<ProgressBar />
		</div>
	);
};
