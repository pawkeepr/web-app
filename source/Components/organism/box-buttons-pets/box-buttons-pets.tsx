/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { FaEdit, FaPlayCircle } from 'react-icons/fa'
import { BtnLink, BtnPrimary } from '~/Components/atoms/btn'
import withCompose from '~/Components/helpers/with-compose'
import useProfile from '~/store/hooks/profile/use-profile'
import type { IPetV2Data } from '~/types/pet-v2'
import { TypeProfile } from '~/types/profile'

type BoxButtonsPetsProps = {
    isLoading?: boolean
    item: IPetV2Data
    condition?: boolean
}

const BoxButtonsPets = ({ isLoading = false, item }: BoxButtonsPetsProps) => {
    const router = useRouter()
    const { data: profile } = useProfile()
    // const { setItem, open, close } = usePlusModal()

    const startAppointment = useCallback(() => {
        router.push(
            `/dashboard/appointments?document=${item?.cpf_cnpj}&pet=${item?.id_pet}`,
        )
    }, [item])

    return (
        <div className="flex flex-wrap items-center justify-center w-full gap-1 px-2 overflow-hidden ">
            <BtnLink
                condition={!isLoading}
                message="Visualizar Histórico"
                outline
                color="neutral"
                href={`/profile/pet?document=${item.cpf_cnpj}&id_pet=${item.id_pet}`}
                className=" !w-1/4  max-w-[33%] "
            >
                <FaEdit />
            </BtnLink>
            <BtnPrimary
                condition={
                    !isLoading &&
                    profile?.user_information?.type_profile ===
                        TypeProfile.VETERINARY
                }
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
