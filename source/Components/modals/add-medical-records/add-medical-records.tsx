import { Formik } from 'formik'

import cn from 'classnames'
import { FaPlus } from 'react-icons/fa'
import { BtnIcon } from '~/Components/atoms/btn'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'

type AddModalProps = {
    children?: (showModal: () => void) => JSX.Element
    item?: any
}

const AddMedicalRecordsModal = ({ children, item }: AddModalProps) => {
    const { closeModal, open, showModal } = useModal()

    const onSubmit = (values: any) => {}
    const title = item ? 'Editar Registro Médico' : 'Adicionar Registro Médico'

    return (
        <>
            {children?.(showModal) || (
                <BtnIcon
                    icon={<FaPlus />}
                    type="button"
                    onClick={showModal}
                    className={cn(
                        `
                        web:absolute web:right-0 web:top-0 web:w-fit web:p-1 web:m-0 web:h-fit  mobile:w-full
                        web:text-gray-400 web:border-none bg-confirm-500 hover:bg-confirm-600 text-white
                    `,
                    )}
                    label="Adicionar Registro Médico"
                />
            )}
            <Modal
                onOpen={() => showModal}
                onClose={() => closeModal()}
                modal
                nested
                open={open}
                lockScroll
                className="pb-0 w-[750px]"
            >
                <div className="w-full">
                    <h6 className="mb-4 font-semibold text-center uppercase">
                        {title}
                    </h6>
                </div>

                <Formik initialValues={{}} onSubmit={onSubmit} enableReinitialize>
                    {() => <div />}
                </Formik>
            </Modal>
        </>
    )
}

export default AddMedicalRecordsModal
