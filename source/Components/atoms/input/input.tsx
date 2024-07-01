import type { ComponentProps } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

export const input = tv({
    base: `
        w-full px-4 py-2 rounded-md
        transition-all duration-100 ease-in-out transition-shadow 
        disabled:opacity-70 text-gray-600 disabled:bg-gray-200
        text-base h-11 
        invalid:!shadow-outline-secondary-500 invalid:!text-secondary-500 
        invalid:border-secondary-500 invalid:focus:border-gray-300
        border 
        font-sans dark:bg-[#292e33] dark:text-gray-200 
        focus:!border-none focus:ring-2 focus:ring-primary-500 
        outline-none 
    `,
    variants: {
        required: {
            true: '!border-secondary-500',
        },
        isValid: {
            true: '!border-primary-500',
        },
        center: {
            true: 'text-center',
        },
    },
})

export type InputProps = ComponentProps<'input'> & VariantProps<typeof input>

const Input = ({
    className,
    isValid = false,
    required = false,
    ...props
}: InputProps) => {
    return (
        <input
            placeholder={props.placeholder || 'Digite aqui ...'}
            className={input({
                className,
                required: required && !isValid,
                isValid: required && isValid,
            })}
            {...props}
        />
    )
}
export default Input
