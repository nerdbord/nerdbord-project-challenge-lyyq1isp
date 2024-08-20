import React, { type FormEvent, useState } from "react";
import styles from "./AuthForm.module.scss";
import { Button } from "@/components/Button/Button";
import { InputFormField } from "@/components/FormFields/InputFormField";
import { PasswordFormField } from "@/components/FormFields/PasswordFormField";
import { validateField } from "@/helpers/validateField";
import { validationConfig } from "@/components/Auth/AuthForm/validationConfig";
import {
	AuthFormFields,
	type AuthUserDataTouched,
	type AuthUserData,
	type AuthFormErrors,
	AuthFormErrorFields,
} from "@/components/Auth/types";

const INITIAL_USER_DATA: AuthUserData = { email: "", password: "" };
const INITIAL_TOUCHED: AuthUserDataTouched = { email: false, password: false };
const INITIAL_ERRORS: AuthFormErrors = { emailError: "", passwordError: "" };

type AuthFormProps = {
	onSubmit: (userData: AuthUserData) => void;
	submitting: boolean;
	submitButtonText: string;
	registerForm?: boolean;
};

export const AuthForm = ({
	onSubmit,
	submitting,
	submitButtonText,
	registerForm = false,
}: AuthFormProps) => {
	const [userData, setUserData] = useState<AuthUserData>(INITIAL_USER_DATA);
	const [errors, setErrors] = useState<AuthFormErrors>(INITIAL_ERRORS);
	const [touched, setTouched] = useState<AuthUserDataTouched>(INITIAL_TOUCHED);

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		const fieldName = name as AuthFormFields;

		setUserData((prev) => ({ ...prev, [fieldName]: value }));

		if (touched[fieldName]) {
			const errorMessage = validateField(fieldName, value, validationConfig);

			setErrors((prev) => ({ ...prev, [`${fieldName}Error`]: errorMessage }));
		}
	};

	const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		const fieldName = name as AuthFormFields;

		setTouched((prev) => ({ ...prev, [fieldName]: true }));

		const errorMessage = validateField(fieldName, value, validationConfig);

		setErrors((prev) => ({ ...prev, [`${fieldName}Error`]: errorMessage }));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const { email, password } = userData;

		const emailError = validateField(AuthFormFields.EMAIL, email, validationConfig);

		const passwordError = validateField(AuthFormFields.PASSWORD, password, validationConfig);

		setErrors({ emailError, passwordError });
		setTouched({ email: true, password: true });

		if (!emailError || !passwordError) {
			onSubmit(userData);
		}
	};

	const handleRemindPassword = () => {
		console.log("Przypomnienie hasła");
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<InputFormField
				label="Email"
				type="email"
				name={AuthFormFields.EMAIL}
				placeholder="Wpisz email"
				onChange={handleChange}
				value={userData[AuthFormFields.EMAIL]}
				onBlur={handleBlur}
				error={errors[AuthFormErrorFields.EMAIL]}
			/>

			<PasswordFormField
				label="Hasło"
				placeholder="Wpisz hasło"
				name={AuthFormFields.PASSWORD}
				remindPassword={registerForm ? undefined : handleRemindPassword}
				onChange={handleChange}
				value={userData[AuthFormFields.PASSWORD]}
				onBlur={handleBlur}
				error={errors[AuthFormErrorFields.PASSWORD]}
			/>

			<Button
				className={styles.signInButton}
				disabled={submitting || !!errors.emailError || !!errors.passwordError}
			>
				{submitButtonText}
			</Button>
		</form>
	);
};
