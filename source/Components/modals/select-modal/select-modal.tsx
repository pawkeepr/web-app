import Input from '~/Components/atoms/input'
import Label from '~/Components/atoms/label'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import type { GenericObject } from '~/types/helpers'
import { option } from '../scheduled-v2-modal/components/helpers'

type SelectModalProps = {
    children?: (showModal: () => void) => JSX.Element
    items: (GenericObject & { icon?: unknown })[]
    title: string
    required?: boolean
    divClassName?: string
    name?: string
    label?: string
    value: GenericObject
    onChange: (item: GenericObject) => void
    id?: string
    isValid?: boolean
    placeholder?: string
}

const SelectModal = ({
    children,
    items = [],
    title,
    value,
    onChange,
    label,
    placeholder = 'Clique para selecionar',
    ...props
}: SelectModalProps) => {
    const { closeModal, open, showModal } = useModal()
    const id = props.name || props.id

    return (
        <>
            {children?.(showModal) || (
                <div className="w-full">
                    <Label
                        label={label}
                        required={props.required}
                        id={id as string}
                    />
                    <Input
                        type="button"
                        value={value.label || placeholder}
                        onClick={showModal}
                        className="text-left"
                        placeholder="Clique para selecionar"
                        {...props}
                    />
                </div>
            )}
            <Modal
                onOpen={() => {
                    showModal()
                }}
                onClose={() => closeModal()}
                modal
                nested
                mobilePage={false}
                open={open}
                lockScroll
                className="pb-0 w-96 h-fit py-4 min-h-96 mobile:!w-full"
            >
                <div className="w-full">
                    <h6 className="mb-4 font-semibold text-center uppercase">
                        {title}
                    </h6>
                </div>

                {items?.map((item) => (
                    <button
                        type="button"
                        onClick={() => {
                            onChange(item)
                            closeModal()
                        }}
                        key={item.value as string}
                        className={option()}
                    >
                        <div className="flex justify-end items-center">
                            {!!item.icon && (
                                <span className="align-middle col-span-1">
                                    {item.icon as JSX.Element}
                                </span>
                            )}
                            <span className="align-middle col-span-2">
                                {item.label}
                            </span>
                        </div>
                    </button>
                ))}
            </Modal>
        </>
    )
}

export default SelectModal
