import { TrashIcon } from '@heroicons/react/24/solid'
import { FaWeight } from 'react-icons/fa'
import { BtnCancel } from '~/Components/atoms/btn'
import ConfirmModal from '~/Components/modals/confirm-modal'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import { useDeleteMedicalRecords } from '~/store/hooks/medical-records'
import { MEDICAL_RECORDS, type BodyEvolution } from '~/types/medical-records'
import type { ItemProps } from './types'

type BodyEvolutionItemProps = ItemProps<BodyEvolution>

const BodyEvolutionItem = ({ item, document, id_pet }: BodyEvolutionItemProps) => {
    const { closeModal, open, showModal } = useModal()

    const { mutateAsync } = useDeleteMedicalRecords({
        id_object: item.id as string,
        cpf_cnpj: document,
        id_pet,
        name: MEDICAL_RECORDS.BODY_EVOLUTION,
    })

    const handleDelete = async () => {
        await mutateAsync()
        closeModal()
    }

    return (
        <>
            <li className="rounded-lg shadow-theme-3 bg-green-50">
                <button
                    type="button"
                    onClick={() => showModal()}
                    className="flex items-center w-full p-6"
                >
                    <div className="p-4 bg-blue-100 rounded-full">
                        <FaWeight className="text-4xl text-blue-500" />
                    </div>
                    <div className="ml-4 text-start">
                        <h2 className="text-lg font-bold text-gray-700">
                            Peso: {item.weight} {item.type_weight}
                        </h2>
                        <p className="text-gray-600">
                            Data de Registro:{' '}
                            {Intl.DateTimeFormat('pt-BR').format(
                                new Date(item.date_register_log),
                            )}
                        </p>
                        <p className="text-gray-600">
                            Notas: {item.notes_consults}
                        </p>
                    </div>
                </button>
            </li>
            <Modal onClose={() => closeModal()} open={open} mobilePage={false}>
                <div className="flex flex-col justify-between items-center w-full h-[90%] p-4">
                    <div className="p-4 bg-green-100 rounded-full">
                        <FaWeight className="text-4xl text-green-500" />
                    </div>
                    <div className="w-full">
                        <h2 className="text-lg font-bold text-gray-700">
                            Peso: {item.weight} {item.type_weight}
                        </h2>
                        <p className="text-gray-600">
                            Data de Registro:{' '}
                            {Intl.DateTimeFormat('pt-BR').format(
                                new Date(item.date_register_log),
                            )}
                        </p>
                        <p className="text-gray-600">
                            Notas: {item.notes_consults}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                        <ConfirmModal
                            onConfirm={() => handleDelete()}
                            title="Deletar Item"
                        >
                            {(showModal) => (
                                <BtnCancel
                                    type="button"
                                    outline
                                    // icone de lixeira
                                    icon={<TrashIcon className="w-5 h-5" />}
                                    className="flex-1 flex-grow w-full text-red-400 border-red-400 hover:text-red-500 hover:border-red-500"
                                    onClick={showModal}
                                    label="Deletar"
                                />
                            )}
                        </ConfirmModal>

                        {/* <BtnPrimary
                            type="submit"
                            label="Salvar"
                            className="flex-1 flex-grow "
                        /> */}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default BodyEvolutionItem
