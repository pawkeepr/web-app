import { tv } from 'tailwind-variants'

export const itemStyle = {
    container: tv({
        base: 'flex my-1 flex-row w-full flex-wrap gap-1 px-2 bg-white border border-dashed rounded-sm border-primary justify-between',
    }),
    ul: tv({
        base: 'gap-2',
    }),
}
