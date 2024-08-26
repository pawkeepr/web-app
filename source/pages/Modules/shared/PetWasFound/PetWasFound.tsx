'use client'

import cn from 'classnames'
import { BsFillSendExclamationFill } from 'react-icons/bs'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { BtnLink } from '~/Components/atoms/btn'
import AvatarPet from '~/Components/molecules/avatar-pet'
import { useTranslations } from '~/hooks/use-translations'
import { usePetPublic } from '~/store/hooks/pet-by-id'
import type { Species } from '~/types/speciesType'
import AuthLayout from '../../_layouts/auth/auth_layout'
import LoadingPage from '../LoadingPage'

type PetWasFoundProps = {
    id_pet: string
}

const PetWasFound = ({ id_pet }: PetWasFoundProps) => {
    const { data, isPending } = usePetPublic(id_pet)

    const name_tutor = data?.main_responsible_guardian?.first_name

    const whatsapp_tutor = data?.main_responsible_guardian?.contact?.whatsapp
    const instagram_tutor = data?.main_responsible_guardian?.contact?.instagram
    const phone_tutor = data?.main_responsible_guardian?.contact?.phone

    const { t } = useTranslations('common')

    const pet = data?.pet_information
    const specie = (pet?.specie as string)?.toLowerCase()
    const race = (pet?.race as string)?.toLowerCase()

    const handleOpenWhatsapp = () => {
        const numberPhone = whatsapp_tutor?.replace(/\D/g, '')

        const defaultMessage =
            'Olá, encontrei seu pet perdido e gostaria de avisar você. Podemos conversar?'
        const encodedMessage = encodeURIComponent(defaultMessage)
        const url = `https://api.whatsapp.com/send/?phone=${numberPhone}&text=${encodedMessage}&type=phone_number&app_absent=0`
        window.open(url, '_blank')
    }

    const handleInstagram = () => {
        const site_instagram = `https://www.instagram.com/${instagram_tutor}`
        window.open(site_instagram, '_blank')
    }

    if (isPending) {
        return (
            <main
                className={cn(
                    'flex flex-1 content-center mobile:content-start items-center justify-center mobile:items-start mobile:justify-start mobile:overflow-hidden',
                )}
            >
                <LoadingPage />
            </main>
        )
    }

    return (
        <AuthLayout title={pet?.name_pet as string}>
            <section className="flex justify-start w-full p-4 web:flex-row mobile:flex-col ">
                <picture className="flex justify-center flex-1 ">
                    <AvatarPet
                        classNames={{
                            img: 'mobile:!w-32 mobile:!h-32',
                        }}
                        src={pet?.url_img as string}
                        name_pet={pet?.name_pet as string}
                        specie={specie as Species}
                    />
                </picture>
                <div className="flex flex-col flex-wrap justify-between flex-[3] w-full gap-2 mt-2 ">
                    {name_tutor && (
                        <p className="flex justify-between text-gray-500">
                            <strong className="mr-2">Tutor:</strong>
                            {name_tutor}
                        </p>
                    )}
                    {pet && (
                        <p className="flex justify-between text-gray-500">
                            <strong className="mr-2">Pet:</strong>
                            <span>
                                {`${pet.name_pet}, ${t(specie)}, ${t(race)}`}
                            </span>
                        </p>
                    )}

                    {whatsapp_tutor && (
                        <p className="flex justify-between text-gray-500">
                            <strong className="mr-2">Whatsapp:</strong>
                            <button
                                type="button"
                                onClick={() => handleOpenWhatsapp()}
                                className="flex flex-row gap-1 text-sm text-gray-500"
                            >
                                <FaWhatsapp className="text-xl text-green-600" />
                                {whatsapp_tutor}
                                <BsFillSendExclamationFill className="w-5 h-5 ml-2" />
                            </button>
                        </p>
                    )}

                    {instagram_tutor && (
                        <p className="flex justify-between text-gray-500">
                            <strong className="mr-2">Instagram:</strong>
                            <button
                                type="button"
                                onClick={() => handleInstagram()}
                                className="flex flex-row gap-1 text-sm text-gray-500"
                            >
                                <FaInstagram className="text-xl text-green-600" />
                                {instagram_tutor}
                                <BsFillSendExclamationFill className="w-5 h-5 ml-2" />
                            </button>
                        </p>
                    )}

                    {phone_tutor && (
                        <p className="flex justify-between text-gray-500">
                            <strong className="mr-2">Telefone:</strong>
                            <span>{phone_tutor}</span>
                        </p>
                    )}

                    <hr className="w-full border-gray-600 dark:border-gray-700" />
                </div>
            </section>
            <div className="flex flex-col items-center justify-center w-full ">
                <p className="-mb-2 font-normal text-gray-400">
                    Você não tem uma conta? Crie agora mesmo e obtenha todos os
                    benefícios da plataforma
                </p>
                <BtnLink message="Criar Conta" href="/sign-up" />
            </div>
        </AuthLayout>
    )
}

export default PetWasFound
