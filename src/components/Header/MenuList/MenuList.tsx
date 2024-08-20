import { useClerk } from "@clerk/nextjs";
import styles from "./MenuList.module.scss";
const MenuList = () => {
	const { signOut } = useClerk();

	return (
		<div className={styles.container}>
			<ul>
				<li>Menu</li>
				<li>Strona</li>
				<li>Kontakt</li>
				<li>
					<button onClick={() => signOut({ redirectUrl: "/" })}>Wyloguj</button>
				</li>
			</ul>
		</div>
	);
};

export { MenuList };
