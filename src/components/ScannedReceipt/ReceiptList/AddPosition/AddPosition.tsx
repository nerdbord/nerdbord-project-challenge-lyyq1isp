import styles from "./AddPosition.module.scss";
type Props = {
	addPosition: () => void;
};
const AddPosition = ({ addPosition }: Props) => {
	return (
		<div className={styles.container} onClick={addPosition}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="25"
				height="25"
				viewBox="0 0 25 25"
				fill="none"
			>
				<g clip-path="url(#clip0_721_627)">
					<path
						d="M19.7916 13.5423H13.5416V19.7923H11.4583V13.5423H5.20825V11.459H11.4583V5.20898H13.5416V11.459H19.7916V13.5423Z"
						fill="#00A3C4"
					/>
				</g>
				<defs>
					<clipPath id="clip0_721_627">
						<rect width="25" height="25" fill="white" />
					</clipPath>
				</defs>
			</svg>
			<span>dodaj pozycje</span>
		</div>
	);
};

export { AddPosition };
