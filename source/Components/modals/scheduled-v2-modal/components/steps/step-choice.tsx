import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { BtnPrimary, BtnSecondary } from '~/Components/atoms/btn'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import routes from '~/routes'
import type { InitialValues, StepProps } from '../../types'
import CardPet from '../card-pet'
import CardTutor from '../card-tutor'

const StepChoice = ({ nextStep, pet, closeModal }: StepProps) => {
    const router = useRouter()
    const { values } = useFormikContextSafe<InitialValues>()

    const handleNavigate = useCallback(() => {
        setTimeout(() => {
            router.push(
                `${routes.dashboard.new.appointments}?document=${values.ownerEmergencyContact?.cpf_cnpj}&pet=${pet.id}`,
            )
        }, 100)

        closeModal?.()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values])

    return (
        <div className="overflow-auto h-[calc(100vh-24rem)] flex flex-1 w-full flex-col gap-2 justify-center items-center">
            <div className="w-1/2 flex-[2] mobile:w-full mt-10 ">
                <CardPet pet={pet.pet_information} />
                <CardTutor
                    tutor={pet.main_responsible_guardian}
                    document={values.ownerEmergencyContact?.cpf_cnpj}
                />
            </div>
            <div
                className="
                flex flex-[1] 
                mobile:flex-col mt-4 
                justify-center w-1/2 
                mobile:w-full items-end mobile:h-full 
                overflow-hidden
            "
            >
                <BtnPrimary
                    className="mobile:w-full"
                    onClick={handleNavigate}
                    label="Iniciar Consulta"
                />

                <BtnSecondary
                    className="mobile:w-full"
                    onClick={nextStep}
                    label="Agendar Consulta"
                />
            </div>
        </div>
    )
}

export default StepChoice
