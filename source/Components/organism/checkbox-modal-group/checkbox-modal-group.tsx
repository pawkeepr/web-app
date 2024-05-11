import { useField } from 'formik'
import { useId, useState } from 'react'
import Modal from '~/Components/organism/modal'

import cn from 'classnames'
import { BtnNeutral } from '~/Components/atoms/btn'
import CheckboxIcon from '~/Components/atoms/checkbox-icon'
import Label from '~/Components/atoms/label'
import useModal from '~/hooks/use-modal'
import {
    option,
    type CheckboxIsMultiModalProps,
} from '../checkbox-is-multi-modal-group'
import styles from '../checkbox-is-multi-modal-group/checkbox-is-multi-modal-group.module.scss'

export default function CheckboxModal<Ctx>({
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
    const [checkedValue, setCheckedValue] = useState<string>()

    function onChangeCheckbox(name: string) {
        return setCheckedValue(() => {
            setValue(name)
            return name
        })
    }

    return (
        <>
            {children?.({ showModal }) || (
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
                            endChildren
                            className="hover:cursor-pointer"
                            label={label}
                            required={required}
                            htmlFor={idLabel}
                            separator=":"
                        >
                            <span className="ml-1">
                                {items.find((item) => item.value === checkedValue)
                                    ?.label || 'Nenhum item selecionado'}
                            </span>
                        </Label>
                    </BtnNeutral>
                </div>
            )}
            <Modal onClose={() => closeModal()} open={open} mobilePage={false}>
                <section className="overflow-hidden">
                    <Label
                        label={label}
                        required={required}
                        id={id}
                        separator=":"
                    />
                    <div className="overflow-x-hidden overflow-y-auto web:h-60">
                        <ul className="flex flex-col flex-wrap items-center justify-around gap-1 w-80 ">
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
                                                checked={
                                                    checkedValue ===
                                                    (item.value as string)
                                                }
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
                </section>
            </Modal>
        </>
    )
}
