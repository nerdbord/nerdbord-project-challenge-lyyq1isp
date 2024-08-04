import Image from "next/image";
import styles from "./Logo.module.scss";
import logo from "@/assets/images/logo.png";

type LogoProps = {
	width: number;
	height: number;
};

const Logo = ({ width, height }: LogoProps) => {
	return (
		<div className={styles.containerLogo}>
			<Image src={logo} alt="app logo" width={width} height={height} />
			<div>
				<p>Expense</p>
				<p>Tracker</p>
			</div>
		</div>
	);
};

export { Logo };
