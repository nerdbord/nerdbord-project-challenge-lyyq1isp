"use client";

import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./SignUp.module.scss";
import { FacebookIcon, GoogleIcon, IdeaIcon } from "@/assets/icons";
import { AuthForm } from "@/components/Auth/AuthForm/AuthForm";
import { type AuthUserData } from "@/components/Auth/types";
import { GoHomeButton } from "@/components/GoHomeButton/GoHomeButton";
import { Logo } from "@/components/Logo/Logo";
import { SignInWithButton } from "@/components/OAuth/SignInWithButton";

export const SignUp = () => {
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [submittingError, setSubmittingError] = useState("");

	const handleSubmit = async (userData: AuthUserData) => {
		if (!isLoaded) {
			return;
		}

		try {
			setSubmittingError("");
			setSubmitting(true);
			const { email, password } = userData;

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

			<AuthForm
				onSubmit={handleSubmit}
				submitting={submitting}
				submitButtonText="Zarejestruj się!"
				registerForm
			/>

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
