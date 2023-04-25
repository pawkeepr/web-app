import { BtnProps } from './types'

const BtnCancel = ({ onClick, label = 'Cancelar', className, ...rest }: BtnProps) => {
    return (
        <button
            className={`btn text-gray-500 hover:text-gray-400 w-40 m-1 previous ${className}`}
            type="button"
            onClick={onClick}
            {...rest}
        >
            {label}
        </button>
    )
}

export default BtnCancel