import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { BtnPrimary, BtnSecondary } from '~/Components/atoms/btn'
import AvatarPet from '~/Components/molecules/avatar-pet'
import routes from '~/constants/routes'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { MapOptionSpecies, type Species } from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import type { InitialValues, StepProps } from '../../types'
import CardTutor from '../card-tutor'

const StepChoice = ({ nextStep, closeModal, pet }: StepProps) => {
    const router = useRouter()
    const { values } = useFormikContextSafe<InitialValues>()

    const handleNavigate = useCallback(() => {
        setTimeout(() => {
            router.push(
                `${routes.dashboard.new.appointments}?document=${values.ownerEmergencyContact?.cpf_cnpj}&pet=${values.id}`,
            )
        }, 100)

        closeModal?.()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values])

    return (
        <div className="flex flex-1 flex-col justify-between">
            <h5 className="text-center font-semibold text-gray-500 mb-2">
                Criar/Iniciar Consulta
            </h5>
            <div className="flex-[2] flex-col items-center justify-center flex">
                <AvatarPet
                    classNames={{
                        img: 'mobile:w-24 mobile:h-24',
                    }}
                    name_pet={pet?.pet_information?.name_pet}
                    specie={
                        MapOptionSpecies[
                        pet?.pet_information
                            ?.specie as keyof typeof MapOptionSpecies
                        ] as Species
                    }
                />
                <div className="flex flex-row gap-1">
                    <h1 className="text-center font-bold text-lg mobile:text-sm text-gray-400">
                        {`${pet?.pet_information?.name_pet}`}
                    </h1>
                </div>
                <h2 className="text-center text-gray-400 text-xs">
                    {calcAge(pet?.pet_information?.date_birth)} ano(s)
                </h2>
            </div>
            <div className="flex-[2] mt-1">
                <CardTutor
                    tutor={values.ownerEmergencyContact}
                    document={values.ownerEmergencyContact?.cpf_cnpj}
                />
            </div>
            <div
                className="
                flex
                flex-row gap-1 mt-4 
                justify-center
                items-end 
                overflow-hidden
            "
            >
                <BtnPrimary
                    className="mobile:w-1/3 flex-grow"
                    onClick={handleNavigate}
                    label="Iniciar Consulta"
                />

                <BtnSecondary
                    className="mobile:w-1/3 flex-grow"
                    onClick={nextStep}
                    label="Agendar Consulta"
                />
            </div>
        </div>
    )
}

export default StepChoice
