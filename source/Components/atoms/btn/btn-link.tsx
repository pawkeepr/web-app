import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv } from "tailwind-variants";

const button = tv({
    base: `
        cursor-pointer
        text-sm rounded-md
        gap-1 leading-1
        text-center
        no-underline block
        rounded-lg transition 
        duration-300 ease-in-out 
        disabled:opacity-50 disabled:cursor-not-allowed
        opacity-80 hover:opacity-100 active:opacity-100
        hover:transform hover:scale-105
        flex items-center justify-center text-center
    `,
    variants: {
        weight: {
            bold: 'font-bold',
            medium: 'font-medium',
            semibold: 'font-semibold',
        },
        size: {
            xs: 'py-0 px-1',
            sm: 'py-1 px-2',
            md: 'py-2 px-5',
            lg: 'py-2 px-6',
        },
        fontSize: {
            xs: 'text-xs',
            sm: 'text-sm',
            md: 'text-md',
            lg: 'text-lg',
        },
        border: {
            hidden: 'border-none',
            label: 'border-transparent',
        },
        bgColor: {
            label: 'bg-transparent',
            primary: 'bg-primary-500 dark:bg-secondary-500',
            secondary: 'bg-secondary-500 dark:bg-primary-500',
        },
        color: {
            label: `text-gray-600 dark:text-white hover:text-gray-800 mobile:text-gray-700`,
            primary: `text-primary-600 dark:text-secondary-500 mobile:text-secondary-600`,
            secondary: `text-secondary-500 dark:text-primary-500 hover:text-secondary-600 mobile:text-primary-600`,
        }
    },
    defaultVariants: {
        fontSize: 'sm',
        weight: 'semibold',
        size: 'sm',
        bgColor: 'label',
        color: 'primary',
        border: 'hidden',
    }
})

type BtnProps = {
    href: string;
    border?: 'hidden' | 'label';
    color?: 'primary' | 'secondary' | 'label';
    bgColor?: 'primary' | 'secondary' | 'label';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    weight?: 'bold' | 'medium' | 'semibold';
    fontSize?: 'xs' | 'sm' | 'md' | 'lg';
} & AnchorHTMLAttributes<HTMLAnchorElement>;


const ButtonLink = ({
    href,
    children,
    className,
    ...props
}: BtnProps) => {
    return (
        <Link
            href={href}
            className={twMerge(button({ ...props }), className)}
            {...props}
        >
            {children}
        </Link>
    )
}


export default ButtonLink