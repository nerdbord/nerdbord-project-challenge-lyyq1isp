import React from "react";
import { PhotoPreview } from "@/components/UploadPhoto/UploadPhotoPreview";

type UploadPhotoProps = {
	imagesSrc: string[];
	setImagesSrc: React.Dispatch<React.SetStateAction<string[]>>;
};

export const UploadPhoto = ({ imagesSrc, setImagesSrc }: UploadPhotoProps) => {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);

		const validFiles = files.filter((file) => file.type.startsWith("image/"));

		validFiles.forEach((file) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				setImagesSrc((prev) => [...prev, reader.result as string]);
			};
		});

		// if (file) {
		// 	if (!file.type.startsWith("image/")) {
		// 		console.error("Invalid file type");
		// 		return;
		// 	}
		// 	// if (file.size > 1024 * 1024) {
		// 	// 	console.error("File size is too big");
		// 	// 	return;
		// 	// }

		// 	const reader = new FileReader();
		// 	reader.onload = (e) => {
		// 		setImageSrc(e.target?.result as string);
		// 	};
		// 	reader.readAsDataURL(file);
		// }
	};

	console.log("imagesSrc", imagesSrc);

	return (
		<div>
			<input type="file" accept="image/" onChange={handleFileChange} multiple />
			{imagesSrc.length > 0 &&
				imagesSrc.map((src, index) => <PhotoPreview key={index} imageSrc={src} />)}
		</div>
	);
};
