import type { ImageProps, StaticImageData } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';

import user from '~/assets/images/users/user-dummy-img.jpg';

type MyImageProps = {
    width?: number;
    height?: number;
    fill?: boolean;
    src: string | StaticImageData;
} & ImageProps

const MyImage = ({ src, alt, style, className, ...rest }: MyImageProps) => {
    const [error, setError] = useState(false);

    return (
        <>
            <Image
                {...rest}
                src={src}
                onError={() => setError(true)}
                alt={alt}
                className={className}
                style={{
                    display: error ? 'none' : 'block',
                    ...style
                }}
            />
            {error && (
                <Image
                    {...rest}
                    src={user}
                    alt="Default Image"
                    className={className}
                />
            )}
        </>
    );
};

export default MyImage;
