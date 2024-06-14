import Link from 'next/link'
import type React from 'react'
import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'
import withControl from '~/Components/helpers/with-control'
import { styledIcon } from './btn'

export const buttonLink = tv({
    base: `
        text-sm font-semibold rounded-md text-center
        leading-1 hover:brightness-90
        transition duration-100 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        bg-opacity-80 hover:bg-opacity-100 active:opacity-100
        hover:transform hover:scale-[101%] disabled:hover:scale-100
        text-opacity-100 text-gray-50 
        text-secondary-500 dark:text-primary-600 hover:no-underline 
    `,
})

type BtnLinkProps = {
    message?: string
    children?: React.ReactNode
    className?: string
} & VariantProps<typeof buttonLink> &
    ComponentProps<typeof Link>

const BtnPureLink = ({
    href,
    children,
    message,
    className,
    ...props
}: BtnLinkProps) => {
    return (
        <Link
            href={href}
            className={buttonLink({ ...props, className })}
            {...(props as any)}
        >
            <>
                {children && (
                    <span className={styledIcon({ ...props })}>{children}</span>
                )}
                {message}
            </>
        </Link>
    )
}
const BtnLink = withControl(BtnPureLink)

export default BtnLink
