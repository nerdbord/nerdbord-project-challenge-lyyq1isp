import styles from "./page.module.css";
import { Header } from "@/ui/Header/Header";

export default function Home() {
	return (
		<>
			<Header />
			<div className={styles.homepage}>This is homepage</div>;
		</>
	);
}
