import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
	console.log("zarejestrowano i zalogowano");

	return <AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/dashboard"} />;
}
