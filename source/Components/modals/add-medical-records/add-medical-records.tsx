import cn from 'classnames'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { BtnIcon } from '~/Components/atoms/btn'
import MedicalRecordsForm from '~/Components/forms/medical-records-form'
import FieldSelect from '~/Components/molecules/field-select'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import {
    MedicalRecordOptions,
    type MEDICAL_RECORDS,
    type MedicalRecordEntry,
} from '~/types/medical-records'

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
    const [type, setType] = useState<{
        value: MEDICAL_RECORDS
        label: string
    } | null>(null)

    const { closeModal, open, showModal } = useModal()

    useEffect(() => {
        return () => {
            setType(null)
        }
    }, [])

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
                className="pb-0 w-[750px] h-fit py-4 min-h-96"
            >
                <div className="w-full">
                    <h6 className="mb-4 font-semibold text-center uppercase">
                        {title}
                    </h6>
                </div>
                <section className="flex flex-1 relative flex-col">
                    <FieldSelect
                        options={MedicalRecordOptions}
                        label="Condição"
                        name="type"
                        onChangeValue={(value) => setType(value as any)}
                    />

                    <MedicalRecordsForm
                        condition={!!type}
                        type={type?.value as MEDICAL_RECORDS}
                        item={item}
                        cpf_cnpj={cpf_cnpj}
                        id_pet={id_pet}
                        handleClose={closeModal}
                    />
                </section>
            </Modal>
        </>
    )
}

export default AddMedicalRecordsModal
