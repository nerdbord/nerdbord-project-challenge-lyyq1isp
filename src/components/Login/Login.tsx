import { SignIn } from "@clerk/nextjs";

const Login = () => {
	return (
		<div>
			<SignIn routing="hash" />
		</div>
	);
};

export { Login };
