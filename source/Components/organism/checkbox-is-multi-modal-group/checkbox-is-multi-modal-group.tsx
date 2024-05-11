import { useField } from 'formik'
import { useId, useState } from 'react'
import Modal from '~/Components/organism/modal'

import cn from 'classnames'
import { tv } from 'tailwind-variants'
import { BtnNeutral } from '~/Components/atoms/btn'
import CheckboxIcon from '~/Components/atoms/checkbox-icon'
import Label from '~/Components/atoms/label'
import useModal from '~/hooks/use-modal'
import type { ObjPaths } from '~/types/helpers'
import styles from './checkbox-is-multi-modal-group.module.scss'
import ItemCheckbox from './item-checkbox'

export type Item<T = unknown> = {
    label: string
    value: T
}

export const option = tv({
    base: `
        w-full flex items-center justify-center
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

export interface CheckboxIsMultiModalProps<Ctx> {
    items: Item[]
    ctx?: Ctx extends undefined ? never : Ctx
    name: Ctx extends undefined ? string : ObjPaths<Ctx>
    label: string
    required?: boolean
    disabledError?: boolean
    className?: string
    id?: string
    children?: (props: { showModal: () => void }) => JSX.Element
}

export default function CheckboxIsMultiModal<Ctx>({
    items = [],
    name,
    label,
    required,
    id,
    className,
    children,
}: CheckboxIsMultiModalProps<Ctx>) {
    const [field, _meta, helpers] = useField(name)
    const { closeModal, open, showModal } = useModal()
    const { setValue } = helpers
    const idLabel = useId()
    const [checkedValues, setCheckedValues] = useState<string[]>([])

    function addItem(name: string) {
        return setCheckedValues((values) => {
            const result = [...values, name]
            setValue(result)
            return result
        })
    }

    function removeItem(name: string) {
        return setCheckedValues((items) => {
            const result = items.filter((item) => item !== name)
            setValue(result)
            return result
        })
    }

    function onChangeCheckbox(name: string) {
        if (!checkedValues.includes(name)) return addItem(name)
        return removeItem(name)
    }

    return (
        <>
            {children?.({ showModal }) || (
                <>
                    <div
                        className={cn(
                            'flex items-center justify-center overflow-visible ',
                            className,
                        )}
                    >
                        <BtnNeutral
                            outline
                            type="button"
                            onClick={showModal}
                            className="h-8"
                            id={idLabel}
                        >
                            <Label
                                className="hover:cursor-pointer"
                                label={label}
                                required={required}
                                htmlFor={idLabel}
                            />
                        </BtnNeutral>
                        {/* Badge da contagem dos checkboxes selecionados */}
                        {
                            <span className="flex items-center justify-center w-8 h-8 px-2 py-1 ml-2 text-xs text-white rounded-full bg-primary-500">
                                {checkedValues?.length || 0}
                            </span>
                        }
                        {/* Badge dos items dos checkboxes selecionados */}
                    </div>
                    <div
                        className={`h-6 overflow-x-auto ${styles['scrollable-x']} `}
                    >
                        {
                            <ul className="flex gap-1 ">
                                <ItemCheckbox
                                    repeat={checkedValues}
                                    name="value"
                                    options={items}
                                    removeItem={removeItem}
                                />
                            </ul>
                        }
                    </div>
                </>
            )}
            <Modal onClose={() => closeModal()} open={open}>
                <div>
                    <Label
                        label={label}
                        required={required}
                        id={id}
                        separator=":"
                    />
                    <ul className="flex flex-col flex-wrap items-center justify-around gap-1 w-80">
                        {items.map((item, index) => (
                            <li
                                className={`flex ${styles['li-option-checkbox']} w-full flex-row items-center mobile:flex-grow justify-center`}
                                key={`${item.value}-${index}`}
                            >
                                <button
                                    type="button"
                                    className={option()}
                                    onClick={() =>
                                        onChangeCheckbox(item.value as string)
                                    }
                                >
                                    <span className="flex-1">
                                        <CheckboxIcon
                                            id={item.value as string}
                                            type="checkbox"
                                            checked={checkedValues.includes(
                                                item.value as string,
                                            )}
                                            {...field}
                                        />
                                    </span>
                                    <strong className="text-center flex-[3] text-xs font-semibold">
                                        {item.label}
                                    </strong>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </>
    )
}
