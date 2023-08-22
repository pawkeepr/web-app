import {
    ClassAttributes,
    TextareaHTMLAttributes,
} from 'react'

import { twMerge } from 'tailwind-merge'
import { input } from '../input'

const TextArea = ({
    className,
    ...props
}: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLTextAreaElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    const style = 'h-20 resize-none overflow-auto transition-shadow'
    return (
        <textarea
            {...props}
            className={twMerge(input({ className }), style)}
        />
    )
}
export default TextArea
