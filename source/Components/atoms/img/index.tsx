/* eslint-disable @next/next/no-img-element */
import { ComponentProps } from 'react'


type ImgProps = ComponentProps<'img'> & { alt: string }

const Img = (props: ImgProps) => {
    return (
        <img {...props} alt={props.alt} />
    )
}

export default Img