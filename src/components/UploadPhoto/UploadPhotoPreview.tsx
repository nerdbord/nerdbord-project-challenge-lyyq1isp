import Image from "next/image";
import styles from "./UploadPhotoPreview.module.scss";

type UploadPhotoPreviewProps = {
	imageURL: string;
	onRemove: () => void;
};

export const UploadPhotoPreview = ({ imageURL, onRemove }: UploadPhotoPreviewProps) => {
	return (
		<div className={styles.imgWrapper}>
			<Image src={imageURL} alt="uploaded" width={300} height={300} />
			<button onClick={onRemove}>X</button>
		</div>
	);
};
