import { useState } from "react";
import { AddIcon, ArrowDown, ArrowUp } from "@/assets/icons";

enum ArrowDirection {
	UP = "UP",
	DOWN = "DOWN",
}

export const Dropdown = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [categories, setCategories] = useState<string[]>([
		"Jedzenie",
		"Rachunki",
		"Transport",
		"Zdrowie",
		"Ubranie",
		"Higiena",
		"Inne",
	]);
	const [newCategory, setNewCategory] = useState<string>("");
	const [arrow, setArrow] = useState(ArrowDirection.DOWN);
	const [value, setValue] = useState<string>("Wybierz kategorię");

	const handleDropdownClick = () => {
		setIsDropdownOpen((prev) => !prev);
		setArrow((prev) => (prev === ArrowDirection.DOWN ? ArrowDirection.UP : ArrowDirection.DOWN));
	};

	const handleSelectCategory = (category: string) => {
		setValue(category);
		handleDropdownClick();
	};

	return (
		<div>
			<button type="button" onClick={() => handleDropdownClick()}>
				{value}
				{arrow === ArrowDirection.DOWN ? <ArrowDown /> : <ArrowUp />}
			</button>

			{isDropdownOpen && (
				<ul>
					{categories.map((category, index) => {
						return (
							<li key={index} onClick={() => handleSelectCategory(category)}>
								{category}
							</li>
						);
					})}
					<div>
						<input
							type="text"
							value={newCategory}
							onChange={(e) => setNewCategory(e.target.value)}
						/>
						<button type="button" onClick={() => setCategories((prev) => [...prev, newCategory])}>
							<AddIcon />
						</button>
					</div>
				</ul>
			)}
		</div>
	);
};
