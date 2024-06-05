import type { ComponentProps } from 'react'
import type { IconType } from 'react-icons'
import { tv, type VariantProps } from 'tailwind-variants'
import withControl from '~/Components/helpers/with-control'

const buttonFloating = {
    button: tv({
        base: `
        fixed z-50 flex flex-col items-center justify-center 
        transition duration-500 ease-in-out mobile:opacity-100 
        bottom-4 mobile:bottom-24 right-5 opacity-40 
        hover:opacity-100
    `,
        variants: {
            'position-x': {
                right: 'right-5',
                left: 'left-5',
            },
            'position-y': {
                top: 'top-5',
                bottom: 'bottom-5',
            },
        },
        defaultVariants: {
            'position-x': 'right',
            'position-y': 'bottom',
        },
    }),
    title: tv({
        base: `
     mb-1 text-xs font-bold text-gray-600
    `,
    }),
    containerIcon: tv({
        base: `
        p-3 rounded-full shadow-2xl bg-secondary-500
    `,
    }),
    icon: tv({
        base: `
        w-6 h-6 text-gray-500
    `,
    }),
}

type BtnFloatingProps = {
    onClick: () => void
    icon: IconType
    title: string
} & VariantProps<typeof buttonFloating.button> &
    ComponentProps<'button'>

const BtnFloating = ({
    onClick,
    icon: Icon,
    title,
    ...props
}: BtnFloatingProps) => {
    return (
        <button
            title={title}
            type="button"
            onClick={onClick}
            className={buttonFloating.button({ ...props })}
            {...props}
        >
            <h6 className={buttonFloating.title()}>{title}</h6>
            <div className={buttonFloating.containerIcon()}>
                <Icon className={buttonFloating.icon()} />
            </div>
        </button>
    )
}

type BtnLinkFloatingProps = {
    icon: IconType
    title: string
} & VariantProps<typeof buttonFloating.button> &
    ComponentProps<'a'>

export const BtnLinkFloating = ({
    href,
    icon: Icon,
    title,
    ...props
}: BtnLinkFloatingProps) => {
    return (
        <a
            {...props}
            title={title}
            type="button"
            href={href}
            className={buttonFloating.button({ ...props })}
        >
            <h6 className={buttonFloating.title()}>{title}</h6>
            <div className={buttonFloating.containerIcon()}>
                <Icon className={buttonFloating.icon()} />
            </div>
        </a>
    )
}

export default withControl(BtnFloating)
