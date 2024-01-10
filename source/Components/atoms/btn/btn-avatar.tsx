import { useField } from 'formik'
import type { ImageProps, StaticImageData } from 'next/image'
import { ChangeEvent, useMemo, useRef, useState } from 'react'

import dummyImg from '~/assets/images/users/user-dummy-img.jpg'
import MyImage from '../my-image/my-image'

import cn from 'classnames'

type AvatarImageProps = {
    src?: string | StaticImageData
    alt?: string
    name?: string
    disabled?: boolean
    size?: number
} & Omit<ImageProps, 'src'>

const BtnAvatar = ({
    src,
    alt,
    name = 'avatar',
    disabled = false,
    size = 40,
}: AvatarImageProps) => {
    const [image, setImage] = useState<File | null>(null)

    const sourceImage = src || dummyImg

    const [field, meta, helpers] = useField(name)
    const { onBlur, value } = field
    const { setValue } = helpers

    const inputRef = useRef<HTMLInputElement>(null)

    function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0]
        /// onChange(event)
        if (file) {
            setImage(file)
            setValue(file)
        }
    }

    function openImageInput() {
        inputRef.current?.click()
    }

    const img = useMemo(() => {
        if (image) {
            return URL.createObjectURL(image)
        }

        return value || sourceImage
    }, [image, sourceImage, value])

    return (
        <div className="text-center">
            <div className="relative inline-block">
                <div className="absolute bottom-0 end-0">
                    <input
                        ref={inputRef}
                        name={name}
                        id="customer-image-input"
                        className="hidden"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={handleImageChange}
                        onBlur={onBlur}
                        disabled={disabled}
                        //onBlur={onBlur}
                    />
                </div>
                <div
                    className={cn(`w-${size} h-${size}`, 'avatar-sm p-1 z-0', {
                        'cursor-pointer': !disabled,
                    })}
                    onClick={openImageInput}
                >
                    <div className="avatar-title bg-light rounded-circle">
                        <MyImage
                            src={img}
                            alt={alt || 'dummyImg'}
                            id="customer-img"
                            fill
                            className="avatar-md rounded-circle"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BtnAvatar
