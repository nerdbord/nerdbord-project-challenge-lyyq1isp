import classNames from "classnames";
import { useState } from "react";
import styles from "./PasswordFormField.module.scss";
import { EyeOffIcon, EyeOnIcon } from "@/assets/icons";

type PasswordFormFieldProps = {
	label?: string;
	error?: string;
	withIcon?: boolean;
	remindPassword?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const cx = classNames.bind(styles);

export const PasswordFormField = ({
	label,
	error,
	className,
	withIcon = true,
	remindPassword,
	...props
}: PasswordFormFieldProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className={cx(styles.formField, className)}>
			{label && <label>{label}</label>}

			<div className={styles.inputWrapper}>
				<input type={showPassword ? "text" : "password"} {...props} />
				{withIcon && (
					<button
						className={styles.showPassword}
						type="button"
						onClick={() => setShowPassword((prev) => !prev)}
					>
						{showPassword ? <EyeOffIcon /> : <EyeOnIcon />}
					</button>
				)}
			</div>

			{remindPassword && (
				<button type="button" className={styles.remindPassword} onClick={remindPassword}>
					Nie pamiętam hasła
				</button>
			)}

			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};
