import type { InputHTMLAttributes } from 'react'

import { RiCheckboxCircleLine } from 'react-icons/ri'
import { tv, type VariantProps } from 'tailwind-variants'

export const checkbox = tv({
    base: `
    w-6 h-6
  `,
    variants: {
        checked: {
            true: 'text-primary-500 ',
            false: 'text-gray-400',
        },
    },
})

type CheckboxProps = VariantProps<typeof checkbox> &
    InputHTMLAttributes<HTMLInputElement>

const CheckboxIcon = ({ className, ...props }: CheckboxProps) => {
    return (
        <RiCheckboxCircleLine
            {...(props as any)}
            className={checkbox({ className, ...props })}
        />
    )
}

export default CheckboxIcon
