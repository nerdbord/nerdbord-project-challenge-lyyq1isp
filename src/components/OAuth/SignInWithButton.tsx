"use client";

import { type ReactNode } from "react";
import styles from "./SignInWithButton.module.scss";
import { Button, type ButtonVariants } from "@/components/Button/Button";

type SignInWithButtonProps = {
	text: string;
	variant: ButtonVariants;
	icon?: ReactNode;
};

export const SignInWithButton = ({ text, variant, icon }: SignInWithButtonProps) => {
	const handleSignIn = () => {
		console.log("logowanie z serwisem zewnętrznym");
	};

	return (
		<Button variant={variant} onClick={handleSignIn} className={styles.button}>
			{icon && <span>{icon}</span>} {text}
		</Button>
	);
};
