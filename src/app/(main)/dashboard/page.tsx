"use client";
import { Container } from "@/components/Container/Container";
import { DownBar } from "@/components/DownBar/DownBar";
import { ExtractingError } from "@/components/ExtractingError/ExtractingError";
import { ExtractingProgress } from "@/components/ExtractingProgress/ExtractingProgress";
import { Header } from "@/components/Header/Header";
import { useExpenseContext } from "@/contexts/ExpenseContext";

export default function DashboardPage() {
	const { isLoading, isError } = useExpenseContext();

	if (isLoading) return <ExtractingProgress />;

	if (isError) return <ExtractingError />;

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
