import Link from "next/link";
import { ArrowLeft } from "@/assets/icons";

export const GoHomeButton = ({ ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
	return (
		<Link href={"/"} {...props}>
			<ArrowLeft />
		</Link>
	);
};
