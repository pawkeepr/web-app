import Link, { type LinkProps } from 'next/link'
import type React from 'react'
import { useId, type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import BtnAvatar from './btn-avatar'

import withControl from '~/Components/helpers/with-control'
import withLoading from '~/Components/helpers/with-loading'

export const button = tv({
    base: `
        mobile:p-4 mobile:w-full w-40 flex-grow
        px-2 h-10 py-1
        text-sm font-semibold rounded-md text-center
        leading-1 hover:brightness-90
        transition duration-100 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        bg-opacity-80 hover:bg-opacity-100 active:opacity-100
        hover:transform hover:scale-[101%] disabled:hover:scale-100
        text-opacity-100 text-gray-50 
        flex justify-center items-center
    `,
    variants: {
        color: {
            primary: 'bg-primary-500',
            secondary: 'bg-secondary-500 text-gray-500 ',
            confirm: 'bg-confirm-500',
            neutral: 'bg-gray-500 text-gray-500',
        },
        text: {
            true: 'bg-transparent border-2 border-secondary-500 text-secondary-500 hover:!bg-gray-100',
        },
        link: {
            true: 'text-secondary-500 dark:text-primary-600 hover:no-underline capitalize w-fit',
        },
        icon: {
            true: 'w-fit p-1 m-0 h-fit text-gray-400 border-none hover:!bg-transparent',
        },
        outline: {
            true: 'bg-transparent !border',
        },
    },
    compoundVariants: [
        {
            outline: true,
            color: 'primary',
            className: 'border-primary-500 text-primary-500 hover:text-primary-600',
        },
        {
            outline: true,
            color: 'secondary',
            className:
                'border-secondary-500 text-secondary-500 hover:text-secondary-500',
        },
        {
            outline: true,
            color: 'confirm',
            className: 'border-confirm-500 text-confirm-500 hover:text-confirm-600',
        },
        {
            outline: true,
            color: 'neutral',
            className: 'border-gray-500 text-gray-500 hover:text-gray-600',
        },
    ],
})

const styledIcon = tv({
    base: `
        flex justify-center items-center
        w-6 h-6
    `,
})

export type BtnProps = {
    icon?: React.ReactNode | string | JSX.Element | JSX.ElementType | null
    label?: string
    iconStyle?: string
    children?: React.ReactNode
    isLoading?: boolean
    condition?: boolean
} & ComponentProps<'button'> &
    VariantProps<typeof button> &
    VariantProps<typeof styledIcon>

const Btn = ({
    label,
    icon,
    className,
    children,
    type = 'button',
    ...props
}: BtnProps) => {
    const id = props.id || useId()
    return (
        <button
            type={type}
            id={id}
            className={button({ ...props, className })}
            {...props}
        >
            {icon && <span className={styledIcon({ ...props })}>{icon}</span>}
            {children && (
                <span className={styledIcon({ ...props })}>{children}</span>
            )}
            {label}
        </button>
    )
}

const BtnCompose = withLoading(withControl(Btn))

const BtnPrimary = ({ label = 'Primário', ...props }: BtnProps) => {
    return <BtnCompose color="primary" label={label} {...props} />
}

const BtnNeutral = ({ label = 'Neutro', ...props }: BtnProps) => {
    return <BtnCompose color="neutral" label={label} {...props} />
}

const BtnSecondary = ({ label = 'Secundário', ...props }: BtnProps) => {
    return <BtnCompose color="secondary" label={label} {...props} />
}

const BtnSuccess = ({ label = 'Sucesso', ...props }: BtnProps) => {
    return <BtnCompose color="primary" label={label} {...props} />
}

const BtnConfirm = ({ label = 'Confirmar', ...props }: BtnProps) => {
    return <BtnCompose color="confirm" label={label} {...props} />
}

const BtnCancel = ({ label = 'Cancelar', ...props }: BtnProps) => {
    return <BtnCompose color="secondary" label={label} {...props} />
}

const BtnLabel = ({ label = 'Texto', ...props }: BtnProps) => {
    return <BtnCompose text label={label} {...props} />
}

const BtnIcon = ({
    icon,
    ...props
}: Omit<BtnProps, 'icon'> & {
    icon?: React.ReactNode
}) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return <BtnCompose icon={icon as any} {...props} />
}

type BtnLinkProps = {
    message?: string
    children?: React.ReactNode
    className?: string
} & VariantProps<typeof button> &
    LinkProps

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
            {...(props as any)}
        >
            {children && (
                <span className={styledIcon({ ...props })}>{children}</span>
            )}
            {message}
        </Link>
    )
}

export {
    Btn,
    BtnAvatar,
    BtnCancel,
    BtnConfirm,
    BtnIcon,
    BtnLabel,
    BtnLink,
    BtnNeutral,
    BtnPrimary,
    BtnSecondary,
    BtnSuccess,
}
