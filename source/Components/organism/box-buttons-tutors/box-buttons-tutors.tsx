/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import { FaEdit } from 'react-icons/fa'
import { BtnConfirm } from '~/Components/atoms/btn'
import withLoading from '~/Components/helpers/with-loading'
import ModalListPets from '~/Components/modals/scheduled-v2-modal/modal-list-pets'
import type { OnChangeOpen } from '~/Components/modals/scheduled-v2-modal/types'
import type { IMainResponsibleGuardian } from '~/types/pet-v2'

type BoxButtonsTutorsProps = {
    isLoading?: boolean
    item: IMainResponsibleGuardian
}

const BoxButtonsTutors = ({ isLoading = false, item }: BoxButtonsTutorsProps) => {
    const onClickScheduled = useCallback(
        (
            onChangeDocument: (document: string) => void,
            onChangeOpen: OnChangeOpen,
        ) => {
            onChangeDocument(item.cpf_cnpj)
            onChangeOpen(true)
        },
        [item],
    )

    return (
        <div className="gap-1 justify-end flex items-end h-full w-full mobile:grid mobile:grid-cols-1 flex-wrap">
            {/* <BtnCancel
                condition={!isLoading}
                label="Agendar Consulta"
                onClick={() => {}}
                className="border-none mobile:!w-full mobile:col-span-1 text-gray-500"
            /> */}
            <ModalListPets>
                {({ onChangeDocument, onChangeOpen }) => (
                    <BtnConfirm
                        condition={!isLoading}
                        label="Agendar Consulta"
                        className="border-none mobile:!w-full mobile:col-span-1 text-white"
                        onClick={onClickScheduled.bind(
                            null,
                            onChangeDocument,
                            onChangeOpen,
                        )}
                    >
                        <FaEdit />
                    </BtnConfirm>
                )}
            </ModalListPets>
        </div>
    )
}

export default withLoading(BoxButtonsTutors)
