import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { type ReceiptListType } from "../ScannedReceipt";
import styles from "./ReceiptList.module.scss";
type Props = {
	data: ReceiptListType[];
	categories: string[];
	setDataFromReceipt: Dispatch<SetStateAction<ReceiptListType[]>>;
};
const ReceiptList = ({ data, categories, setDataFromReceipt }: Props) => {
	const handleChangeData = (event: ChangeEvent<HTMLInputElement>, id: number) => {
		const { name, value } = event.target;
		setDataFromReceipt((prevData) => {
			const changedData = prevData.map((el) => {
				if (el.id === id) {
					return {
						...el,
						[name]: name === "price" || name === "count" ? Number(value) : value,
					};
				}
				return el;
			});
			return changedData;
		});
	};

	return (
		<div className={styles.container}>
			{data.map((expense, index) => {
				return (
					<form key={index} className={styles.form}>
						<label htmlFor="expense-name">Produkt</label>
						<input
							type="text"
							name="name"
							id="expense-name"
							value={expense.name}
							onChange={(event) => {
								handleChangeData(event, expense.id);
							}}
						/>
						<label htmlFor="category">Kategoria</label>
						<input
							list="expense-categories-list"
							id="expense-categories"
							name="category"
							value={expense.category}
							onChange={(event) => {
								handleChangeData(event, expense.id);
							}}
						/>
						<datalist id="expense-categories-list">
							{categories.map((category, index) => {
								return <option key={index} value={category}></option>;
							})}
						</datalist>
						<div>
							<label htmlFor="expense-count">Ilość</label>
							<input
								type="number"
								id="expense-count"
								value={expense.count}
								name="count"
								onChange={(event) => {
									handleChangeData(event, expense.id);
								}}
							/>
							<label htmlFor="expense-price">Cena/szt</label>
							<input
								type="number"
								id="expense-price"
								value={expense.price}
								name="price"
								onChange={(event) => {
									handleChangeData(event, expense.id);
								}}
							/>
							<div>
								<p>Wydatek</p>
								<p>{` ${expense.count * expense.price} zł`}</p>
							</div>
						</div>
					</form>
				);
			})}
		</div>
	);
};
export { ReceiptList };
