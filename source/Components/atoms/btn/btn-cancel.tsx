import type { BtnProps } from './btn'

const BtnCancel = ({
    onClick,
    label = 'Cancelar',
    className,
    ...rest
}: BtnProps) => {
    return (
        <button
            className={`
                btn
                py-2 rounded-lg 
                text-gray-500
                dark:!text-gray-400
                dark:hover:!text-gray-100
                hover:text-gray-400 
                m-1
                previous ${className}
            `}
            type="button"
            onClick={onClick}
            {...rest}
        >
            {label}
        </button>
    )
}

export default BtnCancel
