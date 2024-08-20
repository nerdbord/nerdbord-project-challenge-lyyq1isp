import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

export type ButtonVariants = "primary" | "outline";

type ButtonProps = {
	variant?: ButtonVariants;
	disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement> &
	PropsWithChildren;

const cx = classNames.bind(styles);

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
	const buttonClasses = cx(
		{
			[styles.button]: true,
			[styles.primary]: variant === "primary",
			[styles.outline]: variant === "outline",
		},
		className,
	);

	return (
		<button className={buttonClasses} disabled={props.disabled} {...props}>
			{props.children}
		</button>
	);
};
