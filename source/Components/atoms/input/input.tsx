import { ComponentProps } from 'react';

import { VariantProps, tv } from 'tailwind-variants';

export const input = tv({
    base: `
        w-full px-4 py-2 rounded-sm
        transition-all duration-100 ease-in-out
        focus:outline-none transition-shadow
        disabled:opacity-70 text-gray-600 disabled:bg-gray-200
        text-sm h-10 invalid:!shadow-outline-secondary-500 invalid:!text-secondary-500
        focus:ring-2 focus:ring-primary-500
        font-sans dark:bg-[#292e33] dark:text-gray-200 
        invalid:border-secondary-500 border-1 invalid:focus:border-gray-300
    `,
    variants: {
        required: {
            true: '!border-secondary-500 focus:!border-none',
        },
        center: {
            true: 'text-center',
        }
    },
})

export type InputProps = ComponentProps<'input'> & VariantProps<typeof input>

const Input = ({
    className,
    required = false,
    ...props
}: InputProps) => {
    return (
        <input
            placeholder={props.placeholder || 'Digite aqui ...'}
            className={input({ className, required })}
            {...props}
        />
    )
}
export default Input
