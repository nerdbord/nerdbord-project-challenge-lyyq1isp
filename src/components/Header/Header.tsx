"use client";
import { useState } from "react";
import { Logo } from "./Logo/Logo";
import styles from "./Header.module.scss";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { MenuList } from "./MenuList/MenuList";

export const Header = () => {
	const [showMenu, setShowMenu] = useState(false);
	const handleShowMenu = () => {
		setShowMenu(!showMenu);
	};
	return (
		<header>
			<nav className={styles.nav}>
				<Logo />
				<BurgerMenu onClick={handleShowMenu} />
			</nav>
			{showMenu && <MenuList />}
		</header>
	);
};
