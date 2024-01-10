import { LabelHTMLAttributes } from 'react'
import withControl from '~/Components/helpers/with-control'

import { tv } from 'tailwind-variants'

export const labelStyled = tv({
    base: `
        text-xs font-semibold text-gray-500 gap-1 text-start items-center label justify-start pb-1 mb-0
    `,
})

type LabelProps = {
    id?: string
    required?: boolean
    name?: string
    label?: string
    separator?: string
} & LabelHTMLAttributes<HTMLLabelElement>

const Label = ({
    id,
    label,
    required,
    separator = '',
    className,
    children,
    ...props
}: LabelProps) => {
    if (!label) return null
    return (
        <label
            {...props}
            htmlFor={id || props.name}
            className={labelStyled({ className })}
            data-testid={`label-${id}`}
        >
            {!!children && children}
            {label.trim() ? label + separator : ''}
            {required && <abbr className="text-secondary-500 font-bold">*</abbr>}
        </label>
    )
}

export default withControl(Label)
