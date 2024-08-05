import { type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import styles from "./ReceiptList.module.scss";
import { type Expense } from "@/types/expense.types";
import { CalendarIcon } from "@/assets/icons";
import { renderDate } from "@/utils/renderDate";
import { Dropdown } from "@/components/Dropdown/Dropdown";

type ReceiptListProps = {
	expenses: Expense[];
	categories: string[];
	setExpenses: Dispatch<SetStateAction<Expense[]>>;
	setCategories: Dispatch<SetStateAction<string[]>>;
};

const ReceiptList = ({ expenses }: ReceiptListProps) => {
	// const handleChangeData = (event: ChangeEvent<HTMLInputElement>, id: number) => {
	// 	const { name, value } = event.target;

	// 	setExpenses((prevData) => {
	// 		const changedData = prevData.map((el) => {
	// 			if (el.id === id) {
	// 				return {
	// 					...el,
	// 					[name]: name === "price" || name === "count" ? Number(value) : value,
	// 				};
	// 			}
	// 			return el;
	// 		});
	// 		return changedData;
	// 	});
	// };

	// const handleDeleteExpense = (id: number) => {
	// 	setExpenses((prevData) => {
	// 		const changeData = prevData.filter((el) => {
	// 			return el.id !== id;
	// 		});
	// 		return changeData;
	// 	});
	// };
	console.log("expenses", expenses);

	const getReceiptValue = () => {
		const sum = expenses.reduce((acc, expense) => {
			return acc + expense.value;
		}, 0);

		return sum;
	};

	return (
		<div className={styles.container}>
			<div className={styles.subHeader}>
				<div className={styles.receiptDate}>
					<CalendarIcon />
					<p>{renderDate(expenses[0].date)}</p>
				</div>
				<p className={styles.receiptValue}>{`${getReceiptValue()} zł`}</p>
			</div>
			<form className={styles.form}>
				{expenses.map((expense, index) => {
					return (
						<div key={index} className={styles.inputsContainer}>
							<div>
								<label htmlFor="expense-name">Produkt</label>
								<input
									type="text"
									name="name"
									id="expense-name"
									value={expense.name}
									// onChange={(event) => {
									// 	handleChangeData(event, expense.id);
									// }}
								/>
							</div>
							<div>
								<label htmlFor="expense-category">
									Kategoria
									<Dropdown />
								</label>
								{/* <select name="category" id="expense-category">
									{categories.map((category, index) => {
										return (
											<option key={index} value={category}>
												{category}
											</option>
										);
									})}
									<option>
										<input type="text" />
										<button>
											<AddIcon />
										</button>
									</option>
								</select> */}
								{/* <input
									list="expense-categories-list"
									id="expense-categories"
									name="category"
									value={expense.category}
									// onChange={(event) => {
									// 	handleChangeData(event, expense.id);
									// }}
								/> */}
							</div>
							{/* <datalist id="expense-categories-list">
								{categories.map((category, index) => {
									return <option key={index} value={category}></option>;
								})}
							</datalist> */}
							<div className={styles.pricesInputsContainer}>
								<label htmlFor="expense-value">Wartość</label>
								<input
									id="expense-value"
									name="value"
									value={expense.value}
									type="number"
									// onChange={(event) => {
									// 	handleChangeData(event, expense.id);
									// }}
								/>
								zł
							</div>
							<Image
								className={styles.trashIcon}
								src={"/trash-delete-bin-4 7.png"}
								alt="trash icon"
								width={20}
								height={20}
								// onClick={() => {
								// 	handleDeleteExpense(expense.id);
								// }}
							/>
						</div>
					);
				})}
			</form>
			<div className={styles.buttonsContainer}>
				<p>dodaj pozycję</p>
				<button>Zapisz</button>
			</div>
		</div>
	);
};
export { ReceiptList };
