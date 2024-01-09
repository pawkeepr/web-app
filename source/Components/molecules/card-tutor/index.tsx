import { useFormikContext } from 'formik';
import { FaWhatsapp } from 'react-icons/fa';
import { InitialValues } from '~/pages/AppointmentsPage/Appointments';
import { PetData } from '~/store/slices/appointment-vet/types';
import { KeyOfSpecies, Species } from '~/store/slices/pets/speciesType';

type CardPetProps = {
    pet?: PetData | null;
};

const CardTutor = ({ pet = null }: CardPetProps) => {
    const { values } = useFormikContext<InitialValues>();

    const name_tutor = values.name_tutor || values.tutor_data?.name;
    const cpf_tutor = values.cpf_tutor;
    const email_tutor = values.contact_tutor?.email || values.tutor_data?.email;
    const phone_tutor = values.contact_tutor?.phone || values.tutor_data?.phone;
    const whatsapp_tutor = values.contact_tutor?.whatsapp;

    return (
        <section className="flex flex-col justify-start p-4 w-full">
            <div className="gap-2 flex-wrap flex flex-col mt-2 w-full justify-between ">
                {pet && (
                    <p className="text-gray-500 flex justify-between">
                        <strong className="mr-2">Pet:</strong>
                        <span>
                            {`${pet.name_pet}, ${
                                Species[
                                    pet.specie as Species as unknown as KeyOfSpecies
                                ]
                            }, ${pet.race as string}`}
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
    );
};

export default CardTutor;
