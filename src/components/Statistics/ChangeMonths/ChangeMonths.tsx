"use client";
import { type Dispatch, type SetStateAction, useState, type MouseEvent } from "react";
import { type CurrentDate } from "../Statistics";
import styles from "./ChangeMonths.module.scss";

type ChangeMonthType = {
	date: CurrentDate;
	changeCurrentDate: Dispatch<SetStateAction<CurrentDate>>;
};

const ChangeMonths = ({ date, changeCurrentDate }: ChangeMonthType) => {
	const [monthIndex, setMonthIndex] = useState(date.month);
	const monthString = [
		"Styczeń",
		"Luty",
		"Marzec",
		"Kwiecień",
		"Maj",
		"Czerwiec",
		"Lipiec",
		"Sierpień",
		"Wrzesień",
		"Październik",
		"Listopad",
		"Grudzień",
	];
	const changeMonth = (event: MouseEvent<SVGElement>) => {
		const target = event.target as SVGElement;
		const name = target.getAttribute("name");
		if (monthIndex === 0 && name === "left") {
			setMonthIndex(11);
			changeCurrentDate((prevDate) => {
				return { ...prevDate, year: prevDate.year - 1 };
			});
			return;
		} else if (monthIndex === 11 && name === "right") {
			setMonthIndex(0);
			changeCurrentDate((prevDate) => {
				return { ...prevDate, year: prevDate.year + 1 };
			});
			return;
		}
		if (name === "left") {
			setMonthIndex((prevIndex) => prevIndex - 1);
		} else if (name === "right") {
			setMonthIndex((prevIndex) => prevIndex + 1);
		}
	};
	return (
		<div className={styles.container}>
			<svg
				width="38"
				height="38"
				viewBox="0 0 38 38"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				name="left"
				onClick={changeMonth}
			>
				<g id="MdArrowBackIosNew">
					<path
						id="Vector"
						d="M28.1358 5.96852L25.3333 3.16602L9.5 18.9993L25.3333 34.8327L28.1358 32.0302L15.105 18.9993L28.1358 5.96852Z"
						fill="#0D9488"
					/>
				</g>
			</svg>
			<p>{`${monthString[monthIndex]} ${date.year}`}</p>
			<svg
				width="38"
				height="38"
				viewBox="0 0 38 38"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={styles.arrow}
				name="right"
				onClick={changeMonth}
			>
				<g id="MdArrowBackIosNew">
					<path
						id="Vector"
						d="M28.1358 5.96852L25.3333 3.16602L9.5 18.9993L25.3333 34.8327L28.1358 32.0302L15.105 18.9993L28.1358 5.96852Z"
						fill="#0D9488"
					/>
				</g>
			</svg>
		</div>
	);
};

export { ChangeMonths };
