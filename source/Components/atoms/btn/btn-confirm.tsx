
import cn from 'classnames'
import { BtnProps } from './types'


const BtnConfirm = ({
    label = 'Confirmar',
    className,
    link = false,
    children,
    ...rest
}: BtnProps) => {

    return (
        <button
            className={cn(
                'next btn mobile:p-4',
                {
                    'btn-primary': !link,
                    'btn-link': link,
                },
                className
            )}
            {...rest}
        >
            {children || label}
        </button>
    )
}

export default BtnConfirm