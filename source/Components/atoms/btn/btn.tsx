import Link, { LinkProps } from 'next/link';
import React, { ComponentProps } from 'react';
import { VariantProps, tv } from 'tailwind-variants';
import BtnAvatar from './btn-avatar';

export const button = tv({
    base: `
        mobile:p-4 mobile:w-full w-52
        px-4 m-1 h-12 py-2
        text-sm font-semibold rounded-md text-center
        gap-1 leading-1 font-semibold
        transition duration-100 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        bg-opacity-80 hover:bg-opacity-100 active:opacity-100
        hover:transform hover:scale-105 disabled:hover:scale-100
        text-opacity-100
        flex justify-center items-center
    `,
    variants: {
        primary: {
            true: "bg-primary-500 dark:bg-secondary-500 text-gray-50 dark:text-gray-600 border border-secondary-600 !w-44 "
        },
        secondary: {
            true: "bg-secondary-500 text-white dark:bg-primary-500"
        },
        success: {
            true: "bg-green-500"
        },
        confirm: {
            true: "bg-blue-600 hover:bg-blue-700 enabled:focus:bg-blue-800 enabled:hover:bg-btn-blue-700"
        },
        cancel: {
            true: "bg-secondary-500 text-white hover-text-white !w-44 "
        },
        text: {
            true: "bg-transparent border-2 border-secondary-500 text-secondary-500 hover:!bg-gray-100"
        },
        link: {
            true: "text-secondary-500 dark:text-primary-600 hover:no-underline capitalize w-fit"
        }
    },
})

const styledIcon = tv({
    base: `
        flex justify-center items-center
        w-5 h-5
    `,
})

type BtnProps = {
    icon?: React.ReactNode | string;
    label?: string;
    iconStyle?: string;
    children?: React.ReactNode;
} & ComponentProps<'button'> & VariantProps<typeof button> & VariantProps<typeof styledIcon>

const Btn = ({
    label,
    icon,
    className,
    iconStyle,
    children,
    type = 'button',
    ...props
}: BtnProps) => {
    return (
        <button
            type={type}
            className={button({ ...props, className })} {...props}>
            {icon && <span className={styledIcon({ ...props })}>{icon}</span>}
            {children && <span className={styledIcon({ ...props })}>{children}</span>}
            <span>{label}</span>
        </button>
    )
}

const BtnPrimary = ({ label = "Primário", ...props }: BtnProps) => {
    return (
        <Btn primary label={label} {...props} />
    )
}

const BtnSecondary = ({ label = "Secundário", ...props }: BtnProps) => {
    return (
        <Btn secondary label={label} {...props} />
    )
}

const BtnSuccess = ({ label = "Sucesso", ...props }: BtnProps) => {
    return (
        <Btn success label={label} {...props} />
    )
}

const BtnConfirm = ({ label = "Confirmar", ...props }: BtnProps) => {
    return (
        <Btn confirm label={label} {...props} />
    )
}

const BtnCancel = ({ label = "Cancelar", ...props }: BtnProps) => {
    return (
        <Btn cancel label={label} {...props} />
    )
}

const BtnLabel = ({ label = "Texto", ...props }: BtnProps) => {
    return (
        <Btn text label={label} {...props} />
    )
}

type BtnLinkProps = {
    message?: string;
    children?: React.ReactNode;
    className?: string;
} & VariantProps<typeof button> & LinkProps

const BtnLink = ({
    href,
    children,
    link = true,
    message,
    className,
    ...props
}: BtnLinkProps) => {
    return (
        <Link
            href={href}
            className={button({ ...props, link, className })}
            {...props as any}
        >
            {children && <span className={styledIcon({ ...props })}>{children}</span>}
            {message}
        </Link>
    )
}

export {
    Btn, BtnAvatar, BtnCancel,
    BtnConfirm, BtnLabel,
    BtnLink, BtnPrimary, BtnSecondary, BtnSuccess
};

