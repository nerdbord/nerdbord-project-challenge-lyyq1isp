"use client";
import { useState } from "react";
import styles from "./Header.module.scss";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { MenuList } from "./MenuList/MenuList";
import { Logo } from "@/components/Logo/Logo";

export const Header = () => {
	const [showMenu, setShowMenu] = useState(false);

	const handleShowMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<Logo width={39} height={29} />
				<BurgerMenu onClick={handleShowMenu} />
			</nav>
			{showMenu && <MenuList />}
		</header>
	);
};
