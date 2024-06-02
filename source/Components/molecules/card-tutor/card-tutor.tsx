import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FaWhatsapp } from 'react-icons/fa'
import type { IMainResponsibleGuardian, PetData } from '~/types/pet-v2'
import { getNameTutor } from '~/utils/get-name-tutors'

type CardPetProps = {
    pet: PetData
    tutor: IMainResponsibleGuardian
    date_consultation: string
    time_consultation: string
}

export const ItemCard = ({ label, value }: { label: string; value: string }) => (
    <p className="flex justify-between w-full text-gray-500">
        <strong className="mr-2">{label}</strong>
        <span>{value}</span>
    </p>
)

const CardTutor = ({
    pet,
    tutor,
    date_consultation,
    time_consultation,
}: CardPetProps) => {
    const name_tutor = getNameTutor(tutor)
    const cpf_tutor = tutor?.cpf_cnpj
    const email_tutor = tutor?.contact?.email || 'Não informado'
    const phone_tutor = tutor?.contact?.phone || 'Não informado'
    const whatsapp_tutor = tutor?.contact?.whatsapp || 'Não informado'
    const date_birth = pet?.date_birth || 'Não informado'
    const { t } = useTranslation('common')

    const race = useMemo(() => t(pet?.race as any), [pet?.race])

    const dateFormatted = useMemo(() => {
        const date =
            date_consultation &&
            Intl.DateTimeFormat('pt-BR').format(new Date(date_consultation))
        const hour = time_consultation
        const dateAndHour = `${date} às ${hour}`
        return dateAndHour
    }, [])

    return (
        <section className="flex flex-col justify-start w-full gap-1 px-2">
            <div className="w-full mt-2 mb-2 text-center text-gray-500">
                <h3 className="font-bold">Data Marcada:</h3>
                <p>{dateFormatted}</p>
            </div>
            <ItemCard label="Nome" value={pet?.name_pet || 'Não informado'} />
            <ItemCard label="Pet" value={`${t(pet.specie)}, ${race}`} />
            <ItemCard label="Aniversário" value={date_birth} />
            <ItemCard label="Tutor" value={name_tutor} />
            <ItemCard label="CPF" value={cpf_tutor} />
            <ItemCard label="Email" value={email_tutor} />
            <ItemCard label="Telefone" value={phone_tutor} />

            <p className="flex justify-between text-gray-500">
                <strong className="mr-2">WhatsApp:</strong>
                <span className="flex flex-row gap-2 w-fit ">
                    {whatsapp_tutor}
                    <FaWhatsapp className="text-xl text-green-600" />
                </span>
            </p>
        </section>
    )
}

export default CardTutor
