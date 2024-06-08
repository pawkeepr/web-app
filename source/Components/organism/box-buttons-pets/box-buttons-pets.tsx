/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
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
            `/veterinary/dashboard/appointments?document=${item?.cpf_cnpj}&pet=${item?.id_pet}`,
        )
    }, [item])

    const isVet = profile?.type_profile === TypeProfile.VETERINARY
    const isTutor = profile?.type_profile === TypeProfile.TUTOR

    const href = useMemo(
        () =>
            isTutor
                ? `/tutor/pet/${item?.id_pet}`
                : `/pet?document=${item.cpf_cnpj}&id_pet=${item.id_pet}`,
        [item, isTutor],
    )

    return (
        <div className="flex flex-wrap items-center justify-end w-full gap-1 px-2 overflow-hidden ">
            <BtnLink
                condition={!isLoading}
                message="Visualizar Histórico"
                outline
                color="neutral"
                href={href}
                className=" !w-1/3 border-none web:max-w-[200px]   "
            >
                <FaEdit />
            </BtnLink>
            <BtnPrimary
                condition={!isLoading && isVet}
                label="Iniciar Consulta"
                className="!w-1/3 "
                onClick={startAppointment}
                icon={<FaPlayCircle />}
            />
        </div>
    )
}

const BoxButtonsPetsCompose = withCompose(BoxButtonsPets)

export default BoxButtonsPetsCompose as typeof BoxButtonsPets
