import { useField } from 'formik'
import { useId, useState } from 'react'
import Modal from '~/Components/organism/modal'

import cn from 'classnames'
import { BtnNeutral } from '~/Components/atoms/btn'
import CheckboxIcon from '~/Components/atoms/checkbox-icon'
import Label from '~/Components/atoms/label'
import { ModeView } from '~/Components/molecules/field-control'
import useModal from '~/hooks/use-modal'
import { useTranslations } from '~/hooks/use-translations'
import {
    option,
    useFieldControlClasses,
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
    validateSync,
    isDisabled,
    mode,
    onChangeValue,
}: CheckboxIsMultiModalProps<Ctx>) {
    const [field, _meta, helpers] = useField(name)

    const { closeModal, open, showModal } = useModal()
    const { setValue } = helpers
    const idLabel = useId()
    const [checkedValue, setCheckedValue] = useState<string>()
    const { t } = useTranslations('common')
    const selected = items.find(
        (item) => item.value === field?.value || item?.value === checkedValue,
    )
    function onChangeCheckbox(name: string) {
        setCheckedValue(() => {
            onChangeValue?.(name)
            setValue(name)
            return name
        })
        closeModal()
    }

    const classes = useFieldControlClasses({
        value: checkedValue,
        required,
        validateSync,
        mode,
        className,
    })

    return (
        <>
            {children?.({ showModal }) || (
                <div
                    className={cn(
                        'flex flex-col items-start justify-center overflow-visible w-full px-2',
                        className,
                    )}
                >
                    <Label
                        endChildren
                        className="hover:cursor-pointer"
                        label={t(label)}
                        required={required}
                        htmlFor={idLabel}
                        separator=""
                    />

                    <BtnNeutral
                        outline
                        type="button"
                        disabled={isDisabled || mode === ModeView.readonly}
                        onClick={showModal}
                        className={classes}
                        id={idLabel}
                    >
                        {t(selected ? selected.label : label)}
                        {selected?.icon && (
                            <selected.icon className="w-5 h-5 ml-2" />
                        )}
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
                    <div className="overflow-x-hidden overflow-y-auto scroll scroll-primary h-60">
                        <ul className="flex flex-col flex-wrap items-center justify-around gap-1 w-80 ">
                            {items.map((item, index) => (
                                <li
                                    className={`flex ${styles['li-option-checkbox']}  pr-4 w-full flex-row items-center mobile:flex-grow justify-center`}
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
                                        <strong className="text-center flex flex-row justify-center items-center flex-[3] text-xs font-semibold">
                                            {t(item.label)}
                                            {item.icon && (
                                                <item.icon className="w-5 h-5 ml-2" />
                                            )}
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
