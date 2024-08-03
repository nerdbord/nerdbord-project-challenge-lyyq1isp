import styles from "./Logo.module.scss";
const Logo = () => {
	return (
		<div className={styles.containerLogo}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="53"
				height="38"
				viewBox="0 0 53 38"
				fill="none"
			>
				<path
					d="M0 6.26763C0 1.48095 5.42764 -1.28701 9.30216 1.52375L34.1298 19.5349L43.9535 26.5323C48.6007 29.8424 46.2589 37.1666 40.5534 37.1666H5.86071C2.62393 37.1666 0 34.5426 0 31.3058V6.26763Z"
					fill="#1A365D"
				/>
				<path
					d="M52.7065 5.87073C52.7065 1.16088 47.4321 -1.62505 43.542 1.02998L16.4287 19.5346L6.12852 26.4369C1.31744 29.6609 3.59965 37.1663 9.39107 37.1663H46.8457C50.0825 37.1663 52.7065 34.5424 52.7065 31.3056V5.87073Z"
					fill="#00A3C4"
					fill-opacity="0.45"
				/>
			</svg>
			<div>
				<p>Expense</p>
				<p>Tracker</p>
			</div>
		</div>
	);
};

export { Logo };
