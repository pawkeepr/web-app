import { tv } from 'tailwind-variants'

export const option = tv({
    base: `
        group w-full flex items-center justify-center
        rounded-md px-2 py-4 text-sm gap-2
        hover:bg-primary-500 dark:hover:!bg-primary-600 hover:text-white
        !h-12
        active:bg-primary-500 dark:active:!bg-primary-500 active:text-white
    `,
    variants: {
        selected: {
            true: 'bg-secondary-500 dark:!bg-secondary-600 text-gray-600',
            false: 'text-gray-600',
        },
    },
})
