/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { FaEdit, FaPlayCircle } from 'react-icons/fa'
import { BtnLink, BtnPrimary } from '~/Components/atoms/btn'
import withCompose from '~/Components/helpers/with-compose'
import type { Pet } from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import useProfile from '~/store/hooks/profile/use-profile'
import { TypeProfile } from '~/types/profile'

type BoxButtonsPetsProps = {
    isLoading?: boolean
    item: Pet
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
                : `/veterinary/pet?document=${item.cpf_cnpj}&id_pet=${item.id_pet}`,
        [item, isTutor],
    )

    return (
        <div className="flex flex-wrap items-center justify-end w-full gap-1 px-2 overflow-hidden ">
            <BtnLink
                condition={!isLoading}
                message="Visualizar Históricos"
                color="neutral"
                href={href}
                className=" !w-1/2 h-11 border-none web:w-fit flex justify-center items-center "
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
