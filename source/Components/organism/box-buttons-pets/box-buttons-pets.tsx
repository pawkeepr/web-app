/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { FaEdit, FaPlayCircle } from 'react-icons/fa'
import { BtnConfirm, BtnPrimary } from '~/Components/atoms/btn'
import withCompose from '~/Components/helpers/with-compose'
import type { IPetV2Data } from '~/types/pet-v2'

type BoxButtonsPetsProps = {
    isLoading?: boolean
    item: IPetV2Data
    condition?: boolean
}

const BoxButtonsPets = ({ isLoading = false, item }: BoxButtonsPetsProps) => {
    const router = useRouter()

    // const { setItem, open, close } = usePlusModal()

    const onClickEdit = useCallback(() => {
        router.push(`/profile/pet?document=${item.cpf_cnpj}&id_pet=${item.id_pet}`)
    }, [item])

    const startAppointment = useCallback(() => {
        router.push(
            `/dashboard/appointments?document=${item?.cpf_cnpj}&pet=${item?.id_pet}`,
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
                label="Visualizar Histórico"
                className="border-none mobile:!w-full mobile:col-span-1 text-white"
                onClick={onClickEdit}
            >
                <FaEdit />
            </BtnConfirm>
            <BtnPrimary
                condition={!isLoading}
                label="Iniciar Consulta"
                className="border-none mobile:!w-full mobile:col-span-1"
                onClick={startAppointment}
            >
                <FaPlayCircle />
            </BtnPrimary>
        </div>
    )
}

const BoxButtonsPetsCompose = withCompose(BoxButtonsPets)

export default BoxButtonsPetsCompose as typeof BoxButtonsPets
