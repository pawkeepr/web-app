import { ClassAttributes, LabelHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"
import withControl from "~/Components/helpers/with-control"


type LabelProps = {
    id?: string
    required?: boolean
    name?: string
    label?: string
    separator?: string
} & JSX.IntrinsicAttributes &
    ClassAttributes<HTMLLabelElement> &
    LabelHTMLAttributes<HTMLLabelElement>

const Label = ({
    id,
    label,
    required,
    separator = '',
    className,
    ...props }: LabelProps) => {
    if (!label) return null;

    return (
        <label
            {...props}
            htmlFor={id || props.name}
            className={twMerge("text-xs font-semibold text-gray-500 gap-1", className)}
            data-testid={`label-${id}`}
        >
            {label.trim() ? (label + separator) : ''}
            {required && <abbr className="text-secondary-500 font-bold">*</abbr>}
        </label>
    )
}

export default withControl(Label)