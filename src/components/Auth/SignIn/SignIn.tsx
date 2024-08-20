"use client";

import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./SignIn.module.scss";
import { FacebookIcon, GoogleIcon, IdeaIcon } from "@/assets/icons";
import { AuthForm } from "@/components/Auth/AuthForm/AuthForm";
import { type AuthUserData } from "@/components/Auth/types";
import { GoHomeButton } from "@/components/GoHomeButton/GoHomeButton";
import { Logo } from "@/components/Logo/Logo";
import { SignInWithButton } from "@/components/OAuth/SignInWithButton";

export const SignIn = () => {
	const { isLoaded, signIn, setActive } = useSignIn();
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
			setSubmitting(false);
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

			<AuthForm onSubmit={handleSubmit} submitting={submitting} submitButtonText="Zaloguj się!" />

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

			<div className={styles.notHaveAccount}>
				<p>Nie masz jeszcze konta?</p> <Link href={"/sign-up"}>Zarejestruj się</Link>
			</div>

			{submittingError && <p className={styles.error}>{submittingError}</p>}
		</div>
	);
};
