
import cn from 'classnames'
import { BtnProps } from './types'

import { twMerge } from 'tailwind-merge'
const BtnSuccess = ({
    label = 'Sucesso',
    className,
    link = false,
    children,
    ...rest
}: BtnProps) => {

    return (
        <button
            className={twMerge(cn(
                'next tbtn mobile:p-4',
                {
                    'btn-primary': !link,
                    'btn-link': link,
                }
            ), className)}
            {...rest}
        >
            {children || label}
        </button>
    )
}

export default BtnSuccess