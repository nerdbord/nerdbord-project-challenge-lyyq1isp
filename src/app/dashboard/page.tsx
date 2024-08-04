import { Container } from "@/components/Container/Container";
import { DownBar } from "@/components/DownBar/DownBar";
import { Header } from "@/components/Header/Header";

export default function DashboardPage() {
	return (
		<>
			<Header />
			<Container>
				<div>dashboard</div>
				<DownBar />
			</Container>
		</>
	);
}
