import type { ImageProps, StaticImageData } from 'next/image'
import { ChangeEvent, useState } from 'react';

type AvatarImageProps = {
    src: string | StaticImageData;
    alt?: string;
} & ImageProps;

import dummyImg from "~/assets/images/users/user-dummy-img.jpg";
import MyImage from '../my-image/my-image';

const BtnAvatar = ({ src, alt }: AvatarImageProps) => {
    const [image, setImage] = useState<File | null>(null);

    const sourceImage = src || dummyImg;

    function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];

        if (file) {
            setImage(file);
        }
    }
    
    return (
        <div className="text-center">
            <div className="relative inline-block">
                <div className="absolute bottom-0 end-0">
                    <label htmlFor="customer-image-input" className="block mb-0 cursor-pointer">
                        <div className="avatar-xs">
                            <div className="avatar-title bg-light border rounded-circle text-muted">
                                <i className="ri-image-fill"></i>
                            </div>
                        </div>
                    </label>
                    <input id="customer-image-input" className="hidden" type="file" accept="image/png, image/gif, image/jpeg" onChange={handleImageChange}/>
                </div>
                <div className="avatar-lg p-1">
                    <div className="avatar-title bg-light rounded-circle">
                        <MyImage src={image && URL.createObjectURL(image) || sourceImage} width={300} height={300} alt={alt || "dummyImg"} id="customer-img" className="avatar-md rounded-circle object-cover"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BtnAvatar