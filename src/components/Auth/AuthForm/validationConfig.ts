import { AuthFormFields } from "@/components/Auth/types";
import { type ValidationConfig } from "@/helpers/validateField";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

export const validationConfig: ValidationConfig<AuthFormFields> = {
	[AuthFormFields.EMAIL]: {
		regex: EMAIL_REGEX,
		errorMessage: "Niepoprawny adres email",
	},
	[AuthFormFields.PASSWORD]: {
		regex: PASSWORD_REGEX,
		errorMessage:
			"Hasło musi zawierać co najmniej 8 znaków, w tym jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny",
	},
};
