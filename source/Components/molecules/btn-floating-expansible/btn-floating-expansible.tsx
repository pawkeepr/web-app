import type { ComponentProps } from 'react'
import type { IconType } from 'react-icons'
import { BsPlus } from 'react-icons/bs'
import { tv, type VariantProps } from 'tailwind-variants'
import { create } from 'zustand'
import withControl from '~/Components/helpers/with-control'

const buttonFloatingExpansible = {
    button: tv({
        base: `
            flex justify-center items-center mt-2 
            mobile:opacity-100 opacity-80 hover:opacity-100 
            transition duration-300 ease-in-out mb-1
        `,
    }),
    buttonContainer: tv({
        base: `
            fixed z-[999] flex flex-col items-end justify-end 
            bottom-4 mobile:bottom-24 
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
    childrenContainer: tv({
        base: 'flex flex-col items-center justify-center gap-2 transition duration-300 ease-in-out',
        variants: {
            visible: {
                true: 'translate-y-0',
                false: 'translate-y-12',
            },
        },
    }),
    childrenContainerIcon: tv({
        base: `
            p-2 rounded-full bg-secondary-500 !shadow-2xl 
            transition duration-500 ease-in-out  
            mobile:opacity-100 opacity-40 hover:opacity-100
        `,
    }),
    childrenIcon: tv({
        base: `
            w-6 h-6 text-gray-500
        `,
    }),
    title: tv({
        base: `
            mb-1 text-xs font-bold text-gray-600 wrap text-center w-28 mr-2
        `,
    }),
    containerIcon: tv({
        base: `
            p-3 rounded-full bg-secondary-500 !shadow-2xl
        `,
    }),
    icon: tv({
        base: `
            transition duration-300 linear w-8 h-8 text-gray-500
        `,
        variants: {
            visible: {
                true: 'rotate-45',
                false: 'rotate-0',
            },
        },
    }),
}

type BtnChildLinkProps = {
    title: string
    icon: IconType
} & VariantProps<typeof buttonFloatingExpansible.button> &
    ComponentProps<'a'>

export const ChildLink = ({
    title,
    href,
    onClick,
    icon: Icon,
    ...props
}: BtnChildLinkProps) => {
    return (
        <a
            title={title}
            type="button"
            href={href}
            onClick={onClick}
            className={buttonFloatingExpansible.button({ ...props })}
        >
            <h6 className={buttonFloatingExpansible.title()}>{title}</h6>
            <div className={buttonFloatingExpansible.childrenContainerIcon()}>
                <Icon className={buttonFloatingExpansible.childrenIcon()} />
            </div>
        </a>
    )
}

type UseBtnFloatingExpansible = {
    isChildrenVisible: boolean
    onChangeChildrenVisible: (isChildrenVisible: boolean) => void
}

export const useBtnFloatingExpansible = create<UseBtnFloatingExpansible>((set) => ({
    isChildrenVisible: false,
    onChangeChildrenVisible: (isChildrenVisible: boolean) =>
        set(() => ({ isChildrenVisible })),
}))

export type BtnFloatingExpansibleProps = {
    icon?: IconType
    childLinks: Array<BtnChildLinkProps>
} & VariantProps<typeof buttonFloatingExpansible.buttonContainer> &
    ComponentProps<'button'>

export const BtnFloatingExpansible = ({
    icon: Icon,
    childLinks,
    ...props
}: BtnFloatingExpansibleProps) => {
    const { isChildrenVisible, onChangeChildrenVisible } =
        useBtnFloatingExpansible()

    return (
        <div className={buttonFloatingExpansible.buttonContainer({ ...props })}>
            <div
                className={buttonFloatingExpansible.childrenContainer({
                    visible: isChildrenVisible,
                })}
            >
                {isChildrenVisible &&
                    childLinks.map((childLink: BtnChildLinkProps) => {
                        return (
                            <span key={childLink.href} className="animate-zoom-in ">
                                <ChildLink
                                    title={childLink.title}
                                    icon={childLink.icon}
                                    onClick={childLink.onClick}
                                    href={childLink.href}
                                />
                            </span>
                        )
                    })}
            </div>

            <button
                type="button"
                onClick={() => onChangeChildrenVisible(!isChildrenVisible)}
                className={buttonFloatingExpansible.button({ ...props })}
                {...props}
            >
                <div className={buttonFloatingExpansible.containerIcon()}>
                    <BsPlus
                        className={buttonFloatingExpansible.icon({
                            visible: isChildrenVisible,
                        })}
                    />
                </div>
            </button>
        </div>
    )
}

export default withControl(BtnFloatingExpansible)
