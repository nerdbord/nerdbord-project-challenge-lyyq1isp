import { useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import { AddIcon, ArrowDown, ArrowUp } from "@/assets/icons";
import { useOutsideClick } from "@/hooks/useOutsideClick";

enum ArrowDirection {
	UP = "UP",
	DOWN = "DOWN",
}

type DropdownProps = {
	id: string;
	options: string[];
	onSelect: (category: string, id: string) => void;
	selectedValue: string;
	addNewOptions?: (newCategory: string) => void;
};

export const Dropdown = ({
	options,
	onSelect,
	selectedValue,
	addNewOptions,
	id,
}: DropdownProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [newCategory, setNewCategory] = useState<string>("");
	const [arrow, setArrow] = useState(ArrowDirection.DOWN);

	const dropdownRef = useRef<HTMLDivElement>(null);

	useOutsideClick(
		dropdownRef,
		() => setIsDropdownOpen(false),
		() => setArrow(ArrowDirection.DOWN),
	);

	const handleDropdownClick = () => {
		setIsDropdownOpen((prev) => !prev);
		setArrow((prev) => (prev === ArrowDirection.DOWN ? ArrowDirection.UP : ArrowDirection.DOWN));
	};

	const handleSelectCategory = (category: string) => {
		onSelect(category, id);
		handleDropdownClick();
	};

	const handleAddCategory = () => {
		addNewOptions && addNewOptions(newCategory);
		handleSelectCategory(newCategory);
		setNewCategory("");
	};

	return (
		<div className={styles.dropdownContainer} ref={dropdownRef}>
			<button className={styles.dropdownButton} type="button" onClick={() => handleDropdownClick()}>
				{selectedValue || "Wybierz kategorię"}
				{arrow === ArrowDirection.DOWN ? <ArrowDown /> : <ArrowUp />}
			</button>

			{isDropdownOpen && (
				<ul className={styles.dropdownList}>
					{options.map((option, index) => {
						return (
							<li
								key={index}
								className={styles.dropdownListItem}
								onClick={() => handleSelectCategory(option)}
							>
								{option}
							</li>
						);
					})}
					<li className={styles.dropdownListInput}>
						<input
							type="text"
							value={newCategory}
							placeholder="Dodaj nową kategorię"
							onChange={(e) => setNewCategory(e.target.value)}
						/>
						<button type="button" onClick={handleAddCategory}>
							<AddIcon />
						</button>
					</li>
				</ul>
			)}
		</div>
	);
};
