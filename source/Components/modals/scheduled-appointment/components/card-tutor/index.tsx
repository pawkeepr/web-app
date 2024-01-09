import { FaWhatsapp } from 'react-icons/fa';

type CardTutorProps = {
    tutor: {
        name_tutor: string;
        cpf_tutor: string;
        contact_tutor: {
            email: string | null;
            phone: string | null;
            whatsapp: string | null;
        };
    };
};

const CardTutor = ({ tutor }: CardTutorProps) => {
    return (
        <section className=" flex flex-col justify-start">
            <div className="gap-2 flex-wrap flex flex-col w-full justify-between">
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Tutor:</strong>
                    {tutor.name_tutor}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">CPF:</strong>
                    {tutor.cpf_tutor}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Email:</strong>
                    {tutor.contact_tutor?.email}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Telefone:</strong>
                    {tutor.contact_tutor?.phone}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">WhatsApp:</strong>
                    <span className="w-fit flex flex-row gap-2 ">
                        {tutor.contact_tutor?.whatsapp}
                        <FaWhatsapp className="text-green-600 text-xl" />
                    </span>
                </p>
            </div>
        </section>
    );
};

export default CardTutor;
