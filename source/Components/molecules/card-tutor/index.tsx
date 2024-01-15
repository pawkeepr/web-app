import { FaWhatsapp } from 'react-icons/fa'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { Species } from '~/store/slices/pets/speciesType'
import type { VeterinaryConsultation } from '~/types/appointment'
import type { PetData } from '~/types/pet-v2'
import { getNameTutor } from '~/utils/get-name-tutors'

type CardPetProps = {
    pet?: PetData | null
}

const CardTutor = ({ pet = null }: CardPetProps) => {
    const { values } = useFormikContextSafe<VeterinaryConsultation>()

    const name_tutor = getNameTutor(values.tutor_pet_vet?.tutor)
    const cpf_tutor = values.tutor_pet_vet?.tutor?.cpf_cnpj
    const email_tutor = values.tutor_pet_vet?.tutor?.contact?.email
    const phone_tutor = values.tutor_pet_vet?.tutor?.contact?.phone
    const whatsapp_tutor = values.tutor_pet_vet?.tutor?.contact?.whatsapp

    return (
        <section className="flex flex-col justify-start p-4 w-full">
            <div className="gap-2 flex-wrap flex flex-col mt-2 w-full justify-between ">
                {pet && (
                    <p className="text-gray-500 flex justify-between">
                        <strong className="mr-2">Pet:</strong>
                        <span>
                            {`${pet.name_pet}, ${Species[pet.specie as Species]}, ${
                                pet.race as string
                            }`}
                        </span>
                    </p>
                )}
                {name_tutor && (
                    <p className="text-gray-500 flex justify-between">
                        <strong className="mr-2">Tutor:</strong>
                        {name_tutor}
                    </p>
                )}
                {cpf_tutor && (
                    <p className="text-gray-500 flex justify-between">
                        <strong className="mr-2">CPF:</strong>
                        {cpf_tutor}
                    </p>
                )}
                {email_tutor && (
                    <p className="text-gray-500 flex justify-between">
                        <strong className="mr-2">Email:</strong>
                        {email_tutor}
                    </p>
                )}
                {phone_tutor && (
                    <p className="text-gray-500 flex justify-between">
                        <strong className="mr-2">Telefone:</strong>
                        {phone_tutor}
                    </p>
                )}
                {whatsapp_tutor && (
                    <p className="text-gray-500 flex justify-between">
                        <strong className="mr-2">WhatsApp:</strong>
                        <span className="w-fit flex flex-row gap-2 ">
                            {whatsapp_tutor}
                            <FaWhatsapp className="text-green-600 text-xl" />
                        </span>
                    </p>
                )}
            </div>
        </section>
    )
}

export default CardTutor
