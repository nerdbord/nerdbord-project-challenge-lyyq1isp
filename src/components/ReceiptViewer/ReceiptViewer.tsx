"use client";
import { useState } from "react";
import { ListData } from "./ListData/ListData";

const ReceiptViewer = () => {
	const [editDisabled, setEditDisabled] = useState(true);
	return (
		<div>
			<ListData edit={editDisabled} />
			<button
				onClick={() => {
					setEditDisabled(false);
				}}
			>
				Edytuj
			</button>
		</div>
	);
};

export { ReceiptViewer };
