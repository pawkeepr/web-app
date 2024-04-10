/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import { FaEdit } from 'react-icons/fa'
import { BtnSecondary } from '~/Components/atoms/btn'
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
        <div
            className="
                items-center justify-center
                w-full gap-1 flex 
                overflow-hidden 
                flex-wrap
                px-2
            "
        >
            <ModalListPets>
                {({ onChangeDocument, onChangeOpen }) => (
                    <BtnSecondary
                        condition={!isLoading}
                        label="Agendar Consulta"
                        onClick={onClickScheduled.bind(
                            null,
                            onChangeDocument,
                            onChangeOpen,
                        )}
                    >
                        <FaEdit />
                    </BtnSecondary>
                )}
            </ModalListPets>
        </div>
    )
}

export default withLoading(BoxButtonsTutors)
