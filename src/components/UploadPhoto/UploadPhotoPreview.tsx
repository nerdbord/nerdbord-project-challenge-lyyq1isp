import Image from "next/image";

export const PhotoPreview = ({ imageSrc }: { imageSrc: string }) => {
	return (
		<div>
			<Image src={imageSrc} alt="uploaded" width={300} height={300} />
		</div>
	);
};
