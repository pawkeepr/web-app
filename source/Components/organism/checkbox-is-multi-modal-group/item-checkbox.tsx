import { IoCloseOutline } from 'react-icons/io5'
import { withFor } from '~/utils/for-control-statements'
import type { Item } from './checkbox-is-multi-modal-group'

type ItemCheckboxProps = {
    item?: string
    options: Item[]
    removeItem: (name: string) => void
}

function ItemCheckbox(props: ItemCheckboxProps) {
    const { item, options, removeItem } = props
    if (!item) return <></>

    return (
        <li
            key={item}
            className="flex items-center justify-center h-6 px-2 py-1 text-xs text-gray-500 rounded-full bg-secondary-300 "
        >
            {options.find((option) => option.value === item)?.label}
            <button
                type="button"
                className="w-5 h-5"
                onClick={() => removeItem(item as string)}
            >
                <span className="sr-only">Remover</span>
                <IoCloseOutline className="w-full h-full" />
            </button>
        </li>
    )
}

export default withFor<ItemCheckboxProps>(ItemCheckbox)
