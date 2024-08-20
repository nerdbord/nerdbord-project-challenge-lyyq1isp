import classNames from "classnames";
import styles from "./InputFormField.module.scss";

type InputFormFieldProps = {
	label?: string;
	error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const cx = classNames.bind(styles);

export const InputFormField = ({
	label,
	error,
	type,
	className,
	...props
}: InputFormFieldProps) => {
	return (
		<div className={cx(styles.formField, className)}>
			{label && <label>{label}</label>}

			<input type={type ? type : "text"} {...props} className={error ? styles.invalid : ""} />

			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};
