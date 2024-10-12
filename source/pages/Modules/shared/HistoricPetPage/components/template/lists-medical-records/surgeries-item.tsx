import { TrashIcon } from '@heroicons/react/24/solid'
import { FaCut } from 'react-icons/fa'
import { BtnCancel } from '~/Components/atoms/btn'
import ConfirmModal from '~/Components/modals/confirm-modal'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import { useDeleteMedicalRecords } from '~/store/hooks/medical-records'
import { MEDICAL_RECORDS, type Hospitalization } from '~/types/medical-records'
import type { ItemProps } from './types'

type SurgeryItemProps = ItemProps<Hospitalization>

const SurgeryItem = ({ item, document, id_pet }: SurgeryItemProps) => {
    const { closeModal, open, showModal } = useModal()

    const { mutateAsync } = useDeleteMedicalRecords({
        id_object: item.id as string,
        cpf_cnpj: document,
        id_pet,
        name: MEDICAL_RECORDS.SURGERIES, // Ajuste conforme o enum
    })

    const handleDelete = async () => {
        await mutateAsync()
        closeModal()
    }

    return (
        <>
            <li className="rounded-lg shadow-theme-3 bg-pink-50">
                <button
                    type="button"
                    onClick={() => showModal()}
                    className="flex items-center w-full p-6"
                >
                    <div className="p-4 bg-pink-100 rounded-full">
                        <FaCut className="text-4xl text-pink-500" />{' '}
                        {/* Ícone de cirurgia */}
                    </div>
                    <div className="ml-4 text-start">
                        <h2 className="text-lg font-bold text-gray-700">
                            Cirurgia: {item.name}
                        </h2>
                        <p className="text-gray-600">Local: {item.local}</p>
                        <p className="text-gray-600">
                            Data de Início:{' '}
                            {Intl.DateTimeFormat('pt-BR').format(
                                new Date(item.date_start),
                            )}
                        </p>
                        <p className="text-gray-600">
                            Horário de Início: {item.time_start}
                        </p>
                        <p className="text-gray-600">
                            Data de Término:{' '}
                            {Intl.DateTimeFormat('pt-BR').format(
                                new Date(item.date_end),
                            )}
                        </p>
                        <p className="text-gray-600">
                            Horário de Término: {item.time_end}
                        </p>
                        <p className="text-gray-600">
                            Seguro Saúde: {item.health_insurance}
                        </p>
                        <p className="text-gray-600">Notas: {item.notes}</p>
                    </div>
                </button>
            </li>
            <Modal onClose={() => closeModal()} open={open} mobilePage={false}>
                <div className="flex flex-col justify-between items-center w-full h-[90%] p-4">
                    <div className="p-4 bg-pink-100 rounded-full">
                        <FaCut className="text-4xl text-pink-500" />{' '}
                        {/* Ícone de cirurgia */}
                    </div>
                    <div className="w-full">
                        <h2 className="text-lg font-bold text-gray-700">
                            Cirurgia: {item.name}
                        </h2>
                        <p className="text-gray-600">Local: {item.local}</p>
                        <p className="text-gray-600">
                            Data de Início:{' '}
                            {Intl.DateTimeFormat('pt-BR').format(
                                new Date(item.date_start),
                            )}
                        </p>
                        <p className="text-gray-600">
                            Horário de Início: {item.time_start}
                        </p>
                        <p className="text-gray-600">
                            Data de Término:{' '}
                            {Intl.DateTimeFormat('pt-BR').format(
                                new Date(item.date_end),
                            )}
                        </p>
                        <p className="text-gray-600">
                            Horário de Término: {item.time_end}
                        </p>
                        <p className="text-gray-600">
                            Seguro Saúde: {item.health_insurance}
                        </p>
                        <p className="text-gray-600">Notas: {item.notes}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                        <ConfirmModal
                            onConfirm={() => handleDelete()}
                            title="Deletar Cirurgia"
                        >
                            {(showConfirmModal) => (
                                <BtnCancel
                                    type="button"
                                    outline
                                    icon={<TrashIcon className="w-5 h-5" />}
                                    className="flex-1 flex-grow w-full text-red-400 border-red-400 hover:text-red-500 hover:border-red-500"
                                    onClick={showConfirmModal}
                                    label="Deletar"
                                />
                            )}
                        </ConfirmModal>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SurgeryItem
