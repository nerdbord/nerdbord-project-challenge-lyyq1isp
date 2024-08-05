import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";
import { ScannedReceipt } from "@/components/ScannedReceipt/ScannedReceipt";

export default function ConfirmExpensesPage() {
	return (
		<>
			<Header />
			<Container>
				<ScannedReceipt />
			</Container>
		</>
	);
}
