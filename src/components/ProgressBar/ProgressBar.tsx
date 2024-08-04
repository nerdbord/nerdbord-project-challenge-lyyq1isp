import styles from "./ProgressBar.module.scss";

export const ProgressBar = () => {
	return (
		<div className={styles.progressBar}>
			<div className={styles.progressBarFilled} />
		</div>
	);
};
