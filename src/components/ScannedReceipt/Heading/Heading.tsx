import Image from "next/image";
import Link from "next/link";
import styles from "./Heading.module.scss";
const Heading = () => {
	return (
		<div className={styles.container}>
			<p className={styles.firstText}>Edytuj dane</p>
			<div>
				<Link href={"/"}>Home</Link>
				<Link href={"/"}>Skanuj paragon</Link>
				<Link href={"/"}>Edytuj dane</Link>
			</div>
			<div className={styles.secondTextContainer}>
				<Image src={"/Idea.png"} alt="idea icon" width={25} height={25} />
				<p>Sprawdź czy zeskanowane dane wyświetlają się poprawnie</p>
			</div>
		</div>
	);
};
export { Heading };
