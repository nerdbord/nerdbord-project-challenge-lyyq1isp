import React from "react";

export const AddIcon = ({ color = "white" }: { color?: string }) => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 4V20M20 12L4 12" stroke={color} strokeWidth="2.18182" strokeLinecap="round" />
		</svg>
	);
};
