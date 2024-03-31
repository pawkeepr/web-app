import cn from 'classnames'
import { FaPlus } from 'react-icons/fa'
import { BtnIcon } from '~/Components/atoms/btn'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'

import ItemMedicalRecordsForm from '~/Components/forms/item-medical-records-form'
import MedicalRecordsForm from '~/Components/forms/medical-records-form'
import type { MedicalRecordEntry } from '~/types/medical-records'

type AddModalProps = {
    children?: (showModal: () => void) => JSX.Element
    cpf_cnpj: string
    id_pet: string
    item?: MedicalRecordEntry | null
}

const AddMedicalRecordsModal = ({
    children,
    item = null,
    cpf_cnpj,
    id_pet,
}: AddModalProps) => {
    const { closeModal, open, showModal } = useModal()

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
                        web:w-fit web:p-1 web:m-0 web:h-fit  mobile:w-full
                        web:text-gray-400 web:border-none bg-confirm-500 hover:bg-confirm-600 text-white
                    `,
                    )}
                    label="Adicionar Registro Médico"
                />
            )}
            <Modal
                onOpen={() => {
                    showModal()
                }}
                onClose={() => closeModal()}
                modal
                nested
                open={open}
                lockScroll
                className="pb-0 w-[750px] h-fit py-4 min-h-96"
            >
                <div className="w-full">
                    <h6 className="mb-4 font-semibold text-center uppercase">
                        {title}
                    </h6>
                </div>

                <ItemMedicalRecordsForm
                    form={(props) => <MedicalRecordsForm {...props} />}
                    id_pet={id_pet}
                    handleCancel={closeModal}
                    cpf_cnpj={cpf_cnpj}
                    item={item}
                />
            </Modal>
        </>
    )
}

export default AddMedicalRecordsModal
