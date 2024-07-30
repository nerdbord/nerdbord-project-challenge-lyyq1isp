import Link from "next/link";
// import styles from "./page.module.css";
import { Header } from "@/ui/Header/Header";

export default function Home() {
	return (
		<>
			<Header />
			<Link href={"/dashboard"}>+</Link>
		</>
	);
}
