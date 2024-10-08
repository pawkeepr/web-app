import { FaWhatsapp } from 'react-icons/fa'
import type { IPet } from '~/types/pet'
import type { IMainResponsibleGuardian } from '~/types/pet-v2'
import { getNameTutor } from '~/utils/get-name-tutors'

type CardTutorProps = {
    tutor: Pick<
        IPet['ownerEmergencyContact'],
        'email' | 'cpf_cnpj' | 'first_name' | 'last_name' | 'phone' | 'whatsapp'
    >
    document: string
}

const CardTutor = ({ tutor, document }: CardTutorProps) => {
    return (
        <section className=" flex flex-col justify-start">
            <div className="gap-2 flex-wrap flex flex-col w-full justify-between">
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Tutor:</strong>
                    {getNameTutor(tutor as unknown as IMainResponsibleGuardian)}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">CPF:</strong>
                    {document}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Email:</strong>
                    {tutor?.email}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Telefone:</strong>
                    {tutor?.phone}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">WhatsApp:</strong>
                    <span className="w-fit flex flex-row gap-2 ">
                        {tutor?.whatsapp}
                        <FaWhatsapp className="text-green-600 text-xl" />
                    </span>
                </p>
            </div>
        </section>
    )
}

export default CardTutor
