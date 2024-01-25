/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { FaEdit } from 'react-icons/fa'
import { BtnConfirm } from '~/Components/atoms/btn'
import withLoading from '~/Components/helpers/with-loading'
import type { IMainResponsibleGuardian } from '~/types/pet-v2'

type BoxButtonsTutorsProps = {
    isLoading?: boolean
    item: IMainResponsibleGuardian
}

const BoxButtonsTutors = ({ isLoading = false, item }: BoxButtonsTutorsProps) => {
    const router = useRouter()

    // const { setItem, open, close } = usePlusModal()

    const onClickEdit = useCallback(() => {
        router.push(
            `/dashboard/update-pet?document=${item.cpf_cnpj}&id_pet=${item.id_pet}`,
        )
    }, [item])

    return (
        <div className="gap-1 justify-end flex items-end h-full w-full mobile:grid mobile:grid-cols-1 flex-wrap">
            {/* <BtnCancel
                condition={!isLoading}
                label="Agendar Consulta"
                onClick={() => {}}
                className="border-none mobile:!w-full mobile:col-span-1 text-gray-500"
            /> */}

            <BtnConfirm
                condition={!isLoading}
                label="Agendar Consulta"
                className="border-none mobile:!w-full mobile:col-span-1 text-white"
                onClick={onClickEdit}
            >
                <FaEdit />
            </BtnConfirm>
        </div>
    )
}

export default withLoading(BoxButtonsTutors)
