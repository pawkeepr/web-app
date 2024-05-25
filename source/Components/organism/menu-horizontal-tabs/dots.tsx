import { tv } from 'tailwind-variants'

const dot = tv({
    base: `
        w-3 h-3 bg-gray-300 rounded-full transition-transform
        duration-300 ease-in-out cursor-pointer
    `,
    variants: {
        active: {
            true: 'bg-primary-500 transform scale-125',
        },
    },
})

type DotsProps = {
    total: number
    activeIndex: number
}

const Dots = ({ total, activeIndex }: DotsProps) => {
    return (
        <div className="flex items-center justify-center w-full space-x-2">
            {Array.from({ length: total }).map((_, index) => (
                <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index}
                    className={dot({ active: index === activeIndex })}
                />
            ))}
        </div>
    )
}

export default Dots
