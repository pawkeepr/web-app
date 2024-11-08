import type { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'
import type { VariantProps } from 'tailwind-variants'
import { input } from '../input'

type TextAreaProps = ComponentProps<'textarea'> & VariantProps<typeof input>
export const style = 'h-20 resize-none overflow-auto transition-shadow'

const TextArea = ({ className, ...props }: TextAreaProps) => {
    return <textarea {...props} className={twMerge(input({ className }), style)} />
}
export default TextArea
