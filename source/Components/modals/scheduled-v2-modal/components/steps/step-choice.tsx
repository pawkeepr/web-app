import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { BtnPrimary, BtnSecondary } from '~/Components/atoms/btn'
import AvatarPet from '~/Components/molecules/avatar-pet'
import routes from '~/constants/routes'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
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
        <div className="flex flex-col justify-between flex-1">
            <h5 className="mb-2 font-semibold text-center text-gray-500">
                Criar/Iniciar Consulta
            </h5>
            <div className="flex-[2] flex-col items-center justify-center flex">
                <AvatarPet
                    classNames={{
                        img: 'mobile:w-24 mobile:h-24',
                    }}
                    name_pet={pet?.pet_information?.name_pet}
                    specie={pet?.pet_information?.specie}
                />
                <div className="flex flex-row gap-1">
                    <h1 className="text-lg font-bold text-center text-gray-400 mobile:text-sm">
                        {`${pet?.pet_information?.name_pet}`}
                    </h1>
                </div>
                <h2 className="text-xs text-center text-gray-400">
                    {calcAge(pet?.pet_information?.date_birth)} ano(s)
                </h2>
            </div>
            <div className="flex-[2] mt-1">
                <CardTutor
                    tutor={values.ownerEmergencyContact}
                    document={values.ownerEmergencyContact?.cpf_cnpj}
                />
            </div>
            <div className="flex flex-row items-end justify-center gap-1 mt-4 overflow-hidden ">
                <BtnPrimary
                    className="flex-grow mobile:w-1/3"
                    onClick={handleNavigate}
                    label="Iniciar Consulta"
                />

                <BtnSecondary
                    className="flex-grow mobile:w-1/3"
                    onClick={nextStep}
                    label="Agendar Consulta"
                />
            </div>
        </div>
    )
}

export default StepChoice
