import { InputHTMLAttributes } from 'react';

import { VariantProps, tv } from 'tailwind-variants';

export const checkbox = tv({
    base: `
    rounded-sm
    transition-all duration-100 ease-in-out
    focus:outline-none transition-shadow
    disabled:opacity-70 disabled:bg-gray-200
    invalid:!border-red-500 
    invalid:focus:!border-gray-300 invalid:!shadow-outline-red invalid:!text-red-500
    focus:outline-none
    font-sans dark:bg-[#292e33] dark:text-gray-200 
    border border-primary-500
    
    !w-4 h-4 px-0 py-0 mx-1
    focus:!ring-0 border !border-primary-500
    active:bg-secondary-500 text-primary-500
  `,
    variants: {
        radio: {
            true: "rounded-full",
        },
    }
})

type CheckboxProps = VariantProps<typeof checkbox> & InputHTMLAttributes<HTMLInputElement>

const Checkbox = ({
    className,
    ...props
}: CheckboxProps
) => {
    return (
        <input
            type="checkbox"
            className={checkbox({ className, ...props })}
            {...props}
        />
    )
}

export default Checkbox