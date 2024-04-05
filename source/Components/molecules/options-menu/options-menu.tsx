import { tv } from 'tailwind-variants'
import useResizeMobile from '~/hooks/use-resize-mobile'
import type { OptionSelect } from '../field-control'

export const makeTitle = (title: string, isMobile: boolean) => {
    if (isMobile) {
        return title
            .split(' ')
            .map((item) => item[0])
            .join('')
    }

    return title
}

const optionMenu = tv({
    base: 'p-2 text-center uppercase bg-opacity-20 bg-secondary-500 flex-1 w-full text-gray-400',
    variants: {
        active: {
            true: 'text-white !bg-primary-500 rounded-sm bg-opacity-100 mobile:underline',
        },
    },
})

type OptionsMenuProps = {
    item: OptionSelect & { icon: React.ElementType }
    option: OptionSelect
    onChangeOption: (item: OptionSelect) => void
    classNames?: {
        icon?: string
        label?: string
    }
}

const OptionsMenu = ({
    item,
    onChangeOption,
    option,
    classNames,
}: OptionsMenuProps) => {
    const { isMobile } = useResizeMobile()

    const Icon = item.icon

    return (
        <button
            type="button"
            onClick={() => onChangeOption(item)}
            key={item.value}
            className={optionMenu({ active: item.value === option.value })}
        >
            <div className="flex w-full items-center justify-center gap-2">
                {Icon && (
                    <span className={classNames?.icon}>
                        <Icon className="w-4 h-4 mobile:underline" />
                    </span>
                )}
                <span className={classNames?.label}>
                    {makeTitle(item.label, isMobile)}
                </span>
            </div>
        </button>
    )
}

export default OptionsMenu
