"use client";

import { useState, type FormEvent } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import styles from "./SignIn.module.scss";
import { Logo } from "@/components/Logo/Logo";
import { SignInWithButton } from "@/components/OAuth/SignInWithButton";
import { FacebookIcon, GoogleIcon, IdeaIcon } from "@/assets/icons";
import { Button } from "@/components/Button/Button";
import { InputFormField } from "@/components/FormFields/InputFormField";
import { PasswordFormField } from "@/components/FormFields/PasswordFormField";
import { GoHomeButton } from "@/components/GoHomeButton/GoHomeButton";

const INITIAL_USER_DATA = { email: "", password: "" };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

export const SignIn = () => {
	const { isLoaded, signIn, setActive } = useSignIn();
	const [userData, setUserData] = useState(INITIAL_USER_DATA);
	const router = useRouter();
	const [signing, setSigning] = useState(false);
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
			setSigning(true);
			const { email, password } = userData;

			if (!email || !password) {
				setSubmittingError("Wypełnij wszystkie pola!");
				return;
			}

			const signInAttempt = await signIn.create({
				identifier: email,
				password,
			});

			if (signInAttempt.status === "complete") {
				await setActive({ session: signInAttempt.createdSessionId });
				router.push("/dashboard");
			} else {
				console.error("Sign in attempt failed", signInAttempt);
			}
		} catch (err) {
			if (isClerkAPIResponseError(err)) setSubmittingError(err.errors[0].message);

			console.error(JSON.stringify(err, null, 2));
		} finally {
			setSigning(false);
		}
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
					remindPassword={() => console.log("Przypomnienie hasła")}
					onChange={handleChange}
					value={userData.password}
					onBlur={handleValidate}
					error={error.passwordError}
				/>

				<Button
					className={styles.signInButton}
					disabled={signing || !!error.emailError || !!error.passwordError}
				>
					Zaloguj się
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

			{submittingError && <p className={styles.error}>{submittingError}</p>}
		</div>
	);
};
