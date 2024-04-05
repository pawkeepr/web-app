import { tv } from 'tailwind-variants'

export const screen = tv({
    base: `
        flex-col flex-wrap web:card tablet:card shadow-2xl web:p-8 
        border-secondary-500 relative 
        mobile:px-4 mobile:py-0 mobile:shadow-none mobile:border-none
        rounded-sm mobile:rounded-none
    `,
})
