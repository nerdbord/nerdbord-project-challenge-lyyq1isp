import styles from "./AddPosition.module.scss";
import { AddIcon } from "@/assets/icons";

type Props = {
	addPosition: () => void;
};

export const AddPosition = ({ addPosition }: Props) => {
	return (
		<div className={styles.container} onClick={addPosition}>
			<AddIcon color="#00A3C4" />
			<span>dodaj pozycje</span>
		</div>
	);
};
