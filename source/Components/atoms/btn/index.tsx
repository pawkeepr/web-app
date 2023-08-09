import BtnAvatar from './btn-avatar';
import BtnLink from './btn-link';

import { twMerge } from 'tailwind-merge';

import Button, { BtnProps } from './btn';

const BtnSuccess = ({
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
            {children}
        </Button>
    )
}

const BtnCancel = ({
    className,
    children,
    ...rest
}: BtnProps) => {

    return (
        <Button
            color={'cancel' as any}
            className={twMerge('previous', className)}
            {...rest}
        >
            {children}
        </Button>
    )
}

const BtnLabel = ({
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
            {children}
        </Button>
    )
}

export { BtnAvatar, BtnCancel, BtnLabel, BtnLink, BtnSuccess };

