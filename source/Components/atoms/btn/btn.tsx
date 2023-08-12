import Link, { LinkProps } from 'next/link';
import React, { ComponentProps } from 'react';
import { VariantProps, tv } from 'tailwind-variants';
import BtnAvatar from './btn-avatar';

const button = tv({
    base: `
        mobile:p-4 mobile:w-full
        px-4 m-1 text-white h-10
        text-sm font-semibold rounded-md text-center
        gap-1 leading-1 font-semibold
        transition
        duration-300 ease-in-out w-40 border-none
        disabled:opacity-50 disabled:cursor-not-allowed
        bg-opacity-80 hover:bg-opacity-100 active:opacity-100
        hover:transform hover:scale-105
        !text-opacity-100
        flex justify-center items-center
    `,
    variants: {
        primary: {
            true: "bg-primary-500 dark:bg-secondary-500 text-white"
        },
        secondary: {
            true: "bg-secondary-500 dark:bg-primary-500"
        },
        success: {
            true: "bg-green-500"
        },
        confirm: {
            true: "bg-blue-600 hover:bg-blue-700 enabled:focus:bg-blue-800 enabled:hover:bg-btn-blue-700"
        },
        cancel: {
            true: "bg-transparent border border-red text-red-700 border-red-400 hover:!bg-red-100 hover:border-red-500 hover:text-red-800"
        },
        text: {
            true: "bg-transparent border border-gray-400 text-gray-700 hover:!bg-gray-100 hover:border-gray-500 hover:text-gray-800"
        },
        link: {
            true: "text-secondary-500 dark:text-primary-600 hover:!no-underline capitalize w-fit"
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
            className={button({ className, ...props })} {...props}>
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
    message: string;
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

