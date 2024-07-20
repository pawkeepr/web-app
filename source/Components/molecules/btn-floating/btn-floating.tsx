import { animated, useSpring } from '@react-spring/web'
import {
    createUseGesture,
    dragAction,
    pinchAction,
    useDrag,
} from '@use-gesture/react'
import type React from 'react'
import { useState, type ComponentProps } from 'react'
import type { IconType } from 'react-icons'
import { tv, type VariantProps } from 'tailwind-variants'
import withControl from '~/Components/helpers/with-control'
// import styles from './styles.module.css'

const useGesture = createUseGesture([dragAction, pinchAction])

const buttonFloating = {
    button: tv({
        base: `
        fixed z-50 flex flex-col items-center justify-center 
        transition duration-500 ease-in-out mobile:opacity-100
        opacity-40
        hover:opacity-100 
    `,
        variants: {
            'position-x': {
                right: 'right-1',
                left: 'left-1',
            },
            'position-y': {
                top: 'top-0',
                bottom: 'bottom-10',
            },
        },
        defaultVariants: {
            'position-x': 'right',
            'position-y': 'bottom',
        },
    }),
    title: tv({
        base: `
     mb-1 text-xs font-bold text-gray-600 wrap w-20 text-center
    `,
    }),
    containerIcon: tv({
        base: `
        p-3 rounded-full bg-secondary-500 !shadow-2xl
    `,
    }),
    icon: tv({
        base: `
        w-8 h-8 text-gray-500
    `,
    }),
}

type BtnFloatingProps = {
    onClick: () => void
    icon: IconType
    title: string
} & VariantProps<typeof buttonFloating.button> &
    ComponentProps<'button'>

export const BtnFloating = ({
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
            id="myButton"
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
    onClick,
    ...props
}: BtnLinkFloatingProps) => {
    const [{ x, y }, api] = useSpring(() => ({ x: 85, y: 180 }))
    const [isDragging, setIsDragging] = useState(true)
    const bind = useDrag(({ down, offset: [ox, oy] }) => {
        setTimeout(() => {
            setIsDragging(down)
        }, 100)
        api.start({ x: ox, y: oy, immediate: down })
    })

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isDragging) {
            e.preventDefault()
        } else if (onClick) {
            onClick(e)
        }
    }

    return (
        <animated.div {...bind()} style={{ x, y }}>
            <div>
                <a
                    {...props}
                    title={title}
                    type="button"
                    href={isDragging ? undefined : href}
                    onClick={handleClick}
                    className={buttonFloating.button({ ...props })}
                >
                    <h6 className={buttonFloating.title()}>{title}</h6>
                    <div className={buttonFloating.containerIcon()}>
                        <Icon className={buttonFloating.icon()} />
                    </div>
                </a>
            </div>
        </animated.div>
    )
}

export default withControl(BtnFloating)
