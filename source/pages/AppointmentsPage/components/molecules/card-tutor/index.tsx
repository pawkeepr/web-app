import { useFormikContext } from "formik"
import { FaWhatsapp } from "react-icons/fa"
import { InitialValues } from "~/pages/AppointmentsPage/Appointments"

const CardTutor = () => {

    const { values } = useFormikContext<InitialValues>()

    return (
        <section className=" flex flex-col justify-start p-4">
            <div className="gap-2 flex-wrap flex flex-col mt-2 w-full justify-between">
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Tutor:</strong>
                    {values.name_tutor}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">CPF:</strong>
                    {values.cpf_tutor}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Email:</strong>
                    {values.contact_tutor?.email}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Telefone:</strong>
                    {values.contact_tutor?.phone}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">WhatsApp:</strong>
                    <span className="w-fit flex flex-row gap-2 ">
                        {values.contact_tutor?.whatsapp}
                        <FaWhatsapp className="text-green-600 text-xl" />
                    </span>
                </p>
            </div>
        </section>
    )
}

export default CardTutor