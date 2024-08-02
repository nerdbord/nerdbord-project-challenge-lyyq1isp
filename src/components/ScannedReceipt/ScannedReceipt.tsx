"use client";
import { useState } from "react";
import { Heading } from "./Heading/Heading";
import { ReceiptList } from "./ReceiptList/ReceiptList";
export type ReceiptListType = {
	name: string;
	category: string;
	count: number;
	price: number;
	id: number;
};
const ScannedReceipt = () => {
	const [dataFromReceipt, setDataFromReceipt] = useState<ReceiptListType[]>([
		{
			name: "Balsam do ciała intensywnie regenerujący 200 ml Nivea",
			category: "Kosmetyki",
			count: 1,
			price: 15,
			id: 1,
		},
		{
			name: "Chipsy z kurzcakfhasfgsad",
			category: "Jedzenie",
			count: 1,
			price: 15,
			id: 2,
		},
		{
			name: "Balsam do ciała intensywnie regenerujący 200 ml Nivea",
			category: "blasfa",
			count: 1,
			price: 15,
			id: 3,
		},
		{
			name: "Balsam do ciała intensywnie regenerujący 200 ml Nivea",
			category: "sdfsdfsdfsdf",
			count: 1,
			price: 15,
			id: 4,
		},
	]);
	const categories = ["Żywność", "Rachunki", "Edukacja"];
	return (
		<div>
			<Heading />
			<ReceiptList
				data={dataFromReceipt}
				categories={categories}
				setDataFromReceipt={setDataFromReceipt}
			/>
		</div>
	);
};

export { ScannedReceipt };
