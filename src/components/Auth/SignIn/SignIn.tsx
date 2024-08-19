"use client";

import { type FormEvent } from "react";
import styles from "./SignIn.module.scss";
import { Logo } from "@/components/Logo/Logo";
import { SignInWithButton } from "@/components/OAuth/SignInWithButton";
import { FacebookIcon, GoogleIcon, IdeaIcon } from "@/assets/icons";
import { Button } from "@/components/Button/Button";
import { InputFormField } from "@/components/FormFields/InputFormField";
import { PasswordFormField } from "@/components/FormFields/PasswordFormField";
import { GoHomeButton } from "@/components/GoHomeButton/GoHomeButton";

export const SignIn = () => {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log("logowanie");
	};

	return (
		<div className={styles.wrapper}>
			<GoHomeButton className={styles.goBack} />

			<Logo width={39} height={29} withText />

			<div className={styles.heading}>
				<h3 className={styles.header}>Witamy z powrotem!</h3>

				<div className={styles.info}>
					<IdeaIcon />

					<p>Wprowadź adres email powiązany z Twoim kontem Expanse Tracker</p>
				</div>
			</div>

			<form className={styles.form} onSubmit={handleSubmit}>
				<InputFormField label="Email" type="email" placeholder="Wpisz email" />

				<PasswordFormField
					label="Hasło"
					placeholder="Wpisz hasło"
					remindPassword={() => console.log("Przypomnienie hasła")}
				/>

				<Button className={styles.signInButton}>Zaloguj się</Button>
			</form>

			<div className={styles.divider}>-lub-</div>

			<div className={styles.buttonsWrapper}>
				<SignInWithButton
					strategy="oauth_google"
					text="Kontynuuj z Google"
					variant="outline"
					icon={<GoogleIcon />}
				/>

				<SignInWithButton
					strategy="oauth_facebook"
					text="Kontynuuj z Facebook"
					variant="primary"
					icon={<FacebookIcon />}
				/>
			</div>
		</div>
	);
};
