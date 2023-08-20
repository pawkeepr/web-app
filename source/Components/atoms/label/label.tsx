
type LabelProps = {
    label?: string;
    required?: boolean;
    id?: string;
    separator?: string;
}

const Label = ({ id, label, required, separator }: LabelProps) => {
    if (!label) return null;

    return (
        <label
            htmlFor={id}
            className="mb-0 text-xs font-semibold text-gray-500 gap-1"
            data-testid={`label-${id}`}
        >
            {label.trim() ? (label + separator) : ''}
            {required && <span className="text-danger">*</span>}
        </label>
    )
}

export default Label