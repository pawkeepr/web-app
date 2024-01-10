import { FaWhatsapp } from 'react-icons/fa'
import type { IMainResponsibleGuardian } from '~/types/pet-v2'

type CardTutorProps = {
    tutor: IMainResponsibleGuardian
    document: string
}

const CardTutor = ({ tutor, document }: CardTutorProps) => {
    return (
        <section className=" flex flex-col justify-start">
            <div className="gap-2 flex-wrap flex flex-col w-full justify-between">
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Tutor:</strong>
                    {tutor.name}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">CPF:</strong>
                    {document}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Email:</strong>
                    {tutor.contact?.email}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Telefone:</strong>
                    {tutor.contact?.phone}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">WhatsApp:</strong>
                    <span className="w-fit flex flex-row gap-2 ">
                        {tutor.contact?.whatsapp}
                        <FaWhatsapp className="text-green-600 text-xl" />
                    </span>
                </p>
            </div>
        </section>
    )
}

export default CardTutor
