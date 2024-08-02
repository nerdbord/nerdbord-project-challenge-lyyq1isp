import styles from "./BurgerMenu.module.scss";
type BurgerMenuProps = {
	onClick: () => void;
};
const BurgerMenu = ({ onClick }: BurgerMenuProps) => {
	return (
		<div className={styles.container} onClick={onClick}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
				fill="none"
			>
				<g clip-path="url(#clip0_591_186)">
					<path d="M6 36H42V32H6V36ZM6 26H42V22H6V26ZM6 12V16H42V12H6Z" fill="#1A365D" />
				</g>
				<defs>
					<clipPath id="clip0_591_186">
						<rect width="48" height="48" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</div>
	);
};

export { BurgerMenu };
