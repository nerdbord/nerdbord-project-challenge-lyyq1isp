import React from "react";

export const ArrowLeft = ({ color = "#00A3C4" }: { color?: string }) => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M21 12H3M3 12L10 5M3 12L10 19"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
