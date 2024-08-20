"use client";

import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import React, { type FormEvent, useState } from "react";
import Link from "next/link";
import styles from "./SignUp.module.scss";
import { IdeaIcon, GoogleIcon, FacebookIcon } from "@/assets/icons";
import { Button } from "@/components/Button/Button";
import { InputFormField } from "@/components/FormFields/InputFormField";
import { PasswordFormField } from "@/components/FormFields/PasswordFormField";
import { GoHomeButton } from "@/components/GoHomeButton/GoHomeButton";
import { Logo } from "@/components/Logo/Logo";
import { SignInWithButton } from "@/components/OAuth/SignInWithButton";

const INITIAL_USER_DATA = { email: "", password: "" };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

export const SignUp = () => {
	const { isLoaded, signUp, setActive } = useSignUp();
	const [userData, setUserData] = useState(INITIAL_USER_DATA);
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [error, setErrors] = useState({ emailError: "", passwordError: "" });
	const [submittingError, setSubmittingError] = useState("");

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setUserData((prev) => ({ ...prev, [name]: value }));
	};

	const handleValidate = (e: FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;

		const setError = (errorName: string, errorMessage: string) => {
			setErrors((prev) => ({ ...prev, [errorName]: errorMessage }));
		};

		if (value === "") {
			setError(`${name}Error`, "To pole jest wymagane");
			return;
		}

		const validations: Record<string, () => boolean> = {
			email: () => EMAIL_REGEX.test(value),
			password: () => PASSWORD_REGEX.test(value),
		};

		if (name in validations && !validations[name]()) {
			const errorMessages: Record<string, string> = {
				email: "Niepoprawny adres email",
				password:
					"Hasło musi zawierać co najmniej 8 znaków, w tym dużą i małą literę, cyfrę i znak specjalny",
			};
			setError(`${name}Error`, errorMessages[name]);
		} else {
			setError(`${name}Error`, "");
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!isLoaded) {
			return;
		}

		try {
			setSubmittingError("");
			setSubmitting(true);
			const { email, password } = userData;

			if (!email || !password) {
				setSubmittingError("Wypełnij wszystkie pola!");
				return;
			}

			const signUpAttempt = await signUp.create({
				emailAddress: email,
				password,
			});

			if (signUpAttempt.status === "complete") {
				await setActive({ session: signUpAttempt.createdSessionId });
				router.push("/dashboard");
			} else {
				console.error("Sign in attempt failed", signUpAttempt);
			}
		} catch (err) {
			if (isClerkAPIResponseError(err)) setSubmittingError(err.errors[0].message);

			console.error(JSON.stringify(err, null, 2));
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className={styles.wrapper}>
			<GoHomeButton className={styles.goBack} />

			<Logo width={39} height={29} withText />

			<div className={styles.heading}>
				<h3 className={styles.header}>Zaczynamy!</h3>

				<div className={styles.info}>
					<IdeaIcon />

					<p>Podaj adres email oraz hasło aby utworzyć konto</p>
				</div>
			</div>

			<form className={styles.form} onSubmit={handleSubmit}>
				<InputFormField
					label="Email"
					type="email"
					name="email"
					placeholder="Wpisz email"
					onChange={handleChange}
					value={userData.email}
					onBlur={handleValidate}
					error={error.emailError}
				/>

				<PasswordFormField
					label="Hasło"
					placeholder="Wpisz hasło"
					name="password"
					onChange={handleChange}
					value={userData.password}
					onBlur={handleValidate}
					error={error.passwordError}
				/>

				<Button
					className={styles.signInButton}
					disabled={submitting || !!error.emailError || !!error.passwordError}
				>
					Zarejestruj się
				</Button>
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

			<div className={styles.haveAccount}>
				<p>Masz już konto?</p> <Link href={"/sign-in"}>Zaloguj się</Link>
			</div>

			{submittingError && <p className={styles.error}>{submittingError}</p>}
		</div>
	);
};
