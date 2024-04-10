/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { FaEdit, FaPlayCircle } from 'react-icons/fa'
import { BtnNeutral, BtnPrimary } from '~/Components/atoms/btn'
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
        <div
            className="
                items-center justify-center
                w-full gap-1 flex 
                overflow-hidden 
                flex-wrap
                px-2
            "
        >
            <BtnNeutral
                condition={!isLoading}
                label="Visualizar Histórico"
                outline
                className=" !w-1/4  max-w-[33%] "
                onClick={onClickEdit}
            >
                <FaEdit />
            </BtnNeutral>
            <BtnPrimary
                condition={!isLoading}
                label="Iniciar Consulta"
                className="mobile:!w-full w-1/4 max-w-[33%] "
                onClick={startAppointment}
            >
                <FaPlayCircle />
            </BtnPrimary>
        </div>
    )
}

const BoxButtonsPetsCompose = withCompose(BoxButtonsPets)

export default BoxButtonsPetsCompose as typeof BoxButtonsPets
