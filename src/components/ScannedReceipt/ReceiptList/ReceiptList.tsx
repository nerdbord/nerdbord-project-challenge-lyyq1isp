import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import { type ReceiptListType } from "../ScannedReceipt";
import styles from "./ReceiptList.module.scss";
import { AddPosition } from "./AddPosition/AddPosition";
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
	const handleDeleteExpense = (id: number) => {
		setDataFromReceipt((prevData) => {
			const changeData = prevData.filter((el) => {
				return el.id !== id;
			});
			return changeData;
		});
	};
	const handleAddPostion = () => {
		setDataFromReceipt((prevData) => {
			return [
				...prevData,
				{
					name: "",
					category: "",
					count: 0,
					price: 0,
					id: 12341231,
				},
			];
		});
	};
	return (
		<div className={styles.container}>
			{data.map((expense, index) => {
				return (
					<form key={index} className={styles.form}>
						<div>
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
						</div>
						<div>
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
						</div>
						<datalist id="expense-categories-list">
							{categories.map((category, index) => {
								return <option key={index} value={category}></option>;
							})}
						</datalist>
						<div className={styles.pricesInputsContainer}>
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
							</div>
							<div>
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
							</div>
							<div>
								<p>Suma</p>
								<span>{` ${expense.count * expense.price} zł`}</span>
							</div>
						</div>
						<Image
							className={styles.trashIcon}
							src={"/trash-delete-bin-4 7.png"}
							alt="trash icon"
							width={20}
							height={20}
							onClick={() => {
								handleDeleteExpense(expense.id);
							}}
						/>
					</form>
				);
			})}
			<div className={styles.buttonsContainer}>
				<AddPosition addPosition={handleAddPostion} />
				<button>Zapisz</button>
				<button className={styles.cancelButton}>Anuluj</button>
			</div>
		</div>
	);
};
export { ReceiptList };
