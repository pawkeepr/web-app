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
    item: OptionSelect
    option: OptionSelect
    onChangeOption: (item: OptionSelect) => void
}

const OptionsMenu = ({ item, onChangeOption, option }: OptionsMenuProps) => {
    const { isMobile } = useResizeMobile()

    return (
        <button
            type="button"
            onClick={() => onChangeOption(item)}
            key={item.value}
            className={optionMenu({ active: item.value === option.value })}
        >
            {makeTitle(item.label, isMobile)}
        </button>
    )
}

export default OptionsMenu
