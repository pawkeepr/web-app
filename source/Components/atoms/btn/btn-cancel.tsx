
export type BtnProps = {
    onClick: (e?: any) => void
    label?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const BtnCancel = ({ onClick, label = 'Cancelar', className, ...rest }: BtnProps) => {
    return (
        <button
            className={`btn btn-secondary border-secondary-500 bg-secondary-500 w-40 m-1 previous ${className}`}
            type="button"
            onClick={onClick}
            {...rest}
        >
            {label}
        </button>
    )
}

export default BtnCancel