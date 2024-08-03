import Image from "next/image";
import styles from "./Heading.module.scss";
const Heading = () => {
	return (
		<div className={styles.container}>
			<p className={styles.firstText}>Mój paragon</p>
			<div className={styles.secondTextContainer}>
				<Image src={"/Idea.png"} alt="idea icon" width={25} height={25} />
				<p>Sprawdź czy zeskanowane dane wyświetlają się poprawnie</p>
			</div>
		</div>
	);
};
export { Heading };
