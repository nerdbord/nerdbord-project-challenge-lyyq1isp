type ValidationRule = {
	regex: RegExp;
	errorMessage: string;
};

export type ValidationConfig<T extends string> = { [K in T]: ValidationRule };

export const validateField = <T extends string>(
	name: T,
	value: string,
	validationConfig: ValidationConfig<T>,
) => {
	if (value === "") {
		return "To pole jest wymagane";
	}

	const rule = validationConfig[name];

	if (rule && !rule.regex.test(value)) {
		return rule.errorMessage;
	}

	return "";
};
