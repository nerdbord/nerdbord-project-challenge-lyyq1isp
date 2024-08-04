import Image from "next/image";
import styles from "./Logo.module.scss";
import logo from "@/assets/images/logo.png";

type LogoProps = {
	width: number;
	height: number;
	withText?: boolean;
};

const Logo = ({ width, height, withText }: LogoProps) => {
	return (
		<div className={styles.containerLogo}>
			<Image src={logo} alt="app logo" width={width} height={height} />
			{withText && (
				<div>
					<p>Expense</p>
					<p>Tracker</p>
				</div>
			)}
		</div>
	);
};

export { Logo };
