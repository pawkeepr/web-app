import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'
import { VariantProps } from 'tailwind-variants'
import { input } from '../input'

type TextAreaProps = ComponentProps<'textarea'> & VariantProps<typeof input>

const TextArea = ({ className, ...props }: TextAreaProps) => {
    const style = 'h-20 resize-none overflow-auto transition-shadow'
    return <textarea {...props} className={twMerge(input({ className }), style)} />
}
export default TextArea
