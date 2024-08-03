import styles from "./page.module.css";
import { Main } from "@/components/Main/Main";
import { Header } from "@/ui/Header/Header";

export default function Home() {
	return (
		<>
			<Header />
			<Main />
		</>
	);
}
