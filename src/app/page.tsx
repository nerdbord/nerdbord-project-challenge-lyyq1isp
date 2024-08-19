import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default function Home() {
	return (
		<>
			<Header />
			<Container>
				<div>landing page</div>
				<Link href="/sign-in">Zaloguj</Link>
			</Container>
		</>
	);
}
