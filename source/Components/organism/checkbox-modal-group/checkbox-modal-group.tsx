import { useField } from 'formik'
import { useState } from 'react'
import Modal from '~/Components/organism/modal'

import { tv } from 'tailwind-variants'
import { BtnNeutral } from '~/Components/atoms/btn'
import CheckboxIcon from '~/Components/atoms/checkbox-icon'
import Label from '~/Components/atoms/label'
import useModal from '~/hooks/use-modal'
import type { ObjPaths } from '~/types/helpers'
import styles from './checkbox-modal-group.module.scss'

type Item = {
    label: string
    value: unknown
}

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

interface CheckboxModalProps<Ctx> {
    items: Item[]
    ctx?: Ctx extends undefined ? never : Ctx
    name: Ctx extends undefined ? string : ObjPaths<Ctx>
    label: string
    required?: boolean
    disabledError?: boolean
    divClassName?: string
    id?: string
    children?: (props: { showModal: () => void }) => JSX.Element
}

export default function CheckboxModal<Ctx>({
    items = [],
    name,
    label,
    required,
    id,
    divClassName,
    children,
}: CheckboxModalProps<Ctx>) {
    const [field, _meta, helpers] = useField(name)
    const { closeModal, open, showModal } = useModal()
    const { setValue } = helpers

    const [checkedValues, setCheckedValues] = useState<string[]>([])

    function setCheckboxValue(name: string) {
        if (!checkedValues.includes(name)) {
            return setCheckedValues((values) => {
                const result = [...values, name]
                setValue(result)
                return result
            })
        }

        setCheckedValues((values) => {
            const result = values.filter((element) => element !== name)
            setValue(result)
            return result
        })
    }

    return (
        <>
            {children?.({ showModal }) || (
                <BtnNeutral
                    outline
                    type="button"
                    onClick={showModal}
                    label={label}
                />
            )}
            <Modal onClose={() => closeModal()} open={open}>
                <div className={divClassName}>
                    <Label
                        label={label}
                        required={required}
                        id={id}
                        separator=":"
                    />
                    <ul className="flex flex-col items-center justify-around gap-1 flex-wrap w-40 ">
                        {items.map((item, index) => (
                            <li
                                className={`flex ${styles['li-option-checkbox']} w-full flex-row items-center mobile:flex-grow justify-center`}
                                key={`${item.value}-${index}`}
                            >
                                <button
                                    type="button"
                                    className={option()}
                                    onClick={() =>
                                        setCheckboxValue(item.value as string)
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
