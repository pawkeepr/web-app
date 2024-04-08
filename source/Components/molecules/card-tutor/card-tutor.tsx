import { useMemo } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { BreedNames } from '~/types/breedType'
import type { IMainResponsibleGuardian, PetData } from '~/types/pet-v2'
import { Species } from '~/types/speciesType'
import { getNameTutor } from '~/utils/get-name-tutors'

type CardPetProps = {
    pet: PetData
    tutor: IMainResponsibleGuardian
}

const CardTutor = ({ pet, tutor }: CardPetProps) => {
    const name_tutor = getNameTutor(tutor)
    const cpf_tutor = tutor?.cpf_cnpj
    const email_tutor = tutor?.contact?.email
    const phone_tutor = tutor?.contact?.phone
    const whatsapp_tutor = tutor?.contact?.whatsapp

    const race = useMemo(
        () => BreedNames[pet?.race as keyof typeof BreedNames],
        [pet?.race],
    )

    const specie = Species[pet?.specie as Species]

    return (
        <section className="flex flex-col justify-start px-4 w-full">
            <div className="gap-2 flex-wrap flex flex-col mt-2 w-full justify-between ">
                {pet && (
                    <p className="text-gray-500 flex justify-between">
                        <strong className="mr-2">Pet:</strong>
                        <span>{`${pet.name_pet}, ${specie}, ${race}`}</span>
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
