export enum AuthFormFields {
	EMAIL = "email",
	PASSWORD = "password",
}

export enum AuthFormErrorFields {
	EMAIL = "emailError",
	PASSWORD = "passwordError",
}

export type AuthUserData = Record<AuthFormFields, string>;

export type AuthUserDataTouched = Record<AuthFormFields, boolean>;

export type AuthFormErrors = Record<AuthFormErrorFields, string>;
