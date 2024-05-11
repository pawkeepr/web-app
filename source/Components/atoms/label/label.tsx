import type { LabelHTMLAttributes } from 'react'
import withControl from '~/Components/helpers/with-control'

import { tv } from 'tailwind-variants'

export const labelStyled = tv({
    base: `
        text-xs font-semibold text-gray-500 gap-1 text-start items-center label justify-start pb-1 mb-0 h-fit
    `,
})

type LabelProps = {
    id?: string
    required?: boolean
    name?: string
    label?: string
    separator?: string
    endChildren?: boolean
} & LabelHTMLAttributes<HTMLLabelElement>

const Label = ({
    id,
    label,
    required,
    separator = '',
    className,
    endChildren = false,
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
            {!!children && !endChildren && children}
            {label.trim() ? label + separator : ''}
            {!!children && endChildren && children}
            {required && <abbr className="font-bold text-secondary-500">*</abbr>}
        </label>
    )
}

export default withControl(Label)
