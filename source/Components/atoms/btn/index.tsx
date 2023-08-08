import BtnAvatar from './btn-avatar';
import BtnLink from './btn-link';
import { BtnProps } from './types';

import { twMerge } from 'tailwind-merge';

import Button from './btn';

const BtnSuccess = ({
    label = 'Sucesso',
    className,
    children,
    ...rest
}: BtnProps) => {

    return (
        <Button
            color={'primary' as any}
            className={twMerge('next', className)}
            {...rest}
        >
            {children || label
            }
        </Button>
    )
}

const BtnCancel = ({
    label = 'Cancelar',
    className,
    children,
    ...rest
}: BtnProps) => {

    return (
        <Button
            color={'cancel' as any}
            className={twMerge('next', className)}
            {...rest}
        >
            {children || label
            }
        </Button>
    )
}

const BtnLabel = ({
    label = 'Cancelar',
    className,
    children,
    ...rest
}: BtnProps) => {

    return (
        <Button
            color={'label' as any}
            className={twMerge('next', className)}
            {...rest}
        >
            {children || label
            }
        </Button>
    )
}

export { BtnAvatar, BtnCancel, BtnLabel, BtnLink, BtnSuccess };

