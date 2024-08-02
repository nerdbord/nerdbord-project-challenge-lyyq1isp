import styles from "./MenuList.module.scss";
const MenuList = () => {
	return (
		<div className={styles.container}>
			<ul>
				<li>Menu</li>
				<li>Strona</li>
				<li>Kontakt</li>
				<li>Wyloguj</li>
			</ul>
		</div>
	);
};

export { MenuList };
