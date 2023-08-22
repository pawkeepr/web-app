import { ClassAttributes, InputHTMLAttributes } from 'react';

import { tv } from 'tailwind-variants';

export const input = tv({
    base: `
    w-full px-4 py-2 rounded-sm
    transition-all duration-100 ease-in-out
    focus:outline-none transition-shadow
    disabled:opacity-70 text-gray-600 disabled:bg-gray-200
    text-sm h-10 invalid:!border-secondary-500
    invalid:focus:!border-gray-300 invalid:!shadow-outline-secondary-500 invalid:!text-secondary-500
    focus:outline-none focus:ring-2 focus:ring-primary-500
    font-sans dark:bg-[#292e33] dark:text-gray-200 
    border !border-primary-500 
  `
})

const Input = ({
    className,
    label = '',
    ...props
}: { label?: string } & JSX.IntrinsicAttributes &
    ClassAttributes<HTMLInputElement> &
    InputHTMLAttributes<HTMLInputElement>) => {

    return (
        <input
            placeholder={props.placeholder || 'Digite aqui ...'}
            className={input({ className })}
            {...props}
        />
    )
}
export default Input
