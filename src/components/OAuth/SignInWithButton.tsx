"use client";

import { type ReactNode } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { type OAuthStrategy } from "@clerk/types";
import styles from "./SignInWithButton.module.scss";
import { Button, type ButtonVariants } from "@/components/Button/Button";

type SignInWithButtonProps = {
	strategy: OAuthStrategy;
	text: string;
	variant: ButtonVariants;
	icon?: ReactNode;
};

export const SignInWithButton = ({ strategy, text, variant, icon }: SignInWithButtonProps) => {
	const { signIn } = useSignIn();
	const { signUp, setActive } = useSignUp();

	if (!signIn || !signUp) return null;

	const signInWith = async (strategy: OAuthStrategy) => {
		return signIn.authenticateWithRedirect({
			strategy,
			redirectUrl: "/sign-up/sso-callback",
			redirectUrlComplete: "/dashboard",
		});
	};

	const handleSignIn = async (strategy: OAuthStrategy) => {
		if (!signIn || !signUp) return null;

		const userExistsButNeedsToSignIn =
			signUp.verifications.externalAccount.status === "transferable" &&
			signUp.verifications.externalAccount.error?.code === "external_account_exists";

		if (userExistsButNeedsToSignIn) {
			const res = await signIn.create({ transfer: true });

			if (res.status === "complete") {
				void setActive({
					session: res.createdSessionId,
				});
			}
		}

		const userNeedsToBeCreated = signIn.firstFactorVerification.status === "transferable";

		if (userNeedsToBeCreated) {
			const res = await signUp.create({
				transfer: true,
			});

			if (res.status === "complete") {
				void setActive({
					session: res.createdSessionId,
				});
			}
		} else {
			void signInWith(strategy);
		}
	};

	return (
		<Button variant={variant} onClick={() => handleSignIn(strategy)} className={styles.button}>
			{icon && <span>{icon}</span>} {text}
		</Button>
	);
};
