import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import withCompose from '~/Components/helpers/with-compose'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'

type ModalConfirmProps = {
    title: string
    description?: string
    message?: string
    label?: string
    onConfirm?: () => void
    onCancel?: () => void
    children?: (showModal: () => void) => JSX.Element
}

const ModalConfirm = ({
    message = 'Esta ação não poderá ser desfeita.',
    onCancel,
    onConfirm,
    label = 'Confirmar',
    title = 'Você tem certeza?',
    description,
    children,
}: ModalConfirmProps) => {
    const { closeModal, open, showModal } = useModal({ name: 'warning' })

    const handleConfirm = () => {
        onConfirm?.()
        closeModal()
    }

    const handleCancel = () => {
        onCancel?.()
        closeModal()
    }

    return (
        <>
            {children?.(showModal)}
            {!children && (
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={() => showModal()}
                        className="
                                rounded-md 
                                bg-secondary-500 bg-opacity-20 
                                px-4 py-2 text-sm 
                                font-medium 
                                text-white 
                                hover:bg-opacity-30 
                                focus:outline-none 
                                focus-visible:ring-2 
                                focus-visible:ring-white 
                                focus-visible:ring-opacity-75
                            "
                    >
                        {label}
                    </button>
                </div>
            )}

            <Modal
                onOpen={() => showModal}
                onClose={() => closeModal()}
                modal
                nested
                open={open}
                lockScroll
                mobilePage={false}
                className="w-fit h-fit m-2"
            >
                <div className="flex justify-center items-center flex-col max-w-[480px] ">
                    <h2 className="text-xl mb-1 font-semibold leading-6 text-gray-900 dark:!text-gray-200 text-center">
                        {title}
                    </h2>

                    <legend className="col-span-full text-sm text-gray-500 text-center">
                        {description}
                    </legend>

                    <p className="text-sm text-center text-gray-700 dark:!text-gray-300 leading-6">
                        {message}
                    </p>

                    <div className="mt-4 flex justify-center items-center">
                        <BtnCancel type="button" onClick={handleCancel} />

                        <BtnPrimary
                            type="button"
                            label="Continuar"
                            onClick={handleConfirm}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default withCompose(ModalConfirm)
