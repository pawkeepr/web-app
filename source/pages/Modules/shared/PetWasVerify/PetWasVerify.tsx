'use client'

import cn from 'classnames'
import { BtnLink } from '~/Components/atoms/btn'
import AvatarPet from '~/Components/molecules/avatar-pet'
import { useTranslations } from '~/hooks/use-translations'
import { usePetVerifyPublic } from '~/store/hooks/pet-by-id'
import type { Species } from '~/types/speciesType'
import AuthLayout from '../../_layouts/auth/auth_layout'
import LoadingPage from '../LoadingPage'

type PetWasVerifyProps = {
    id_pet: string
}

const PetWasVerify = ({ id_pet }: PetWasVerifyProps) => {
    const { data, isPending } = usePetVerifyPublic(id_pet)

    const name_tutor =
        data?.main_responsible_guardian?.name ||
        data?.main_responsible_guardian?.first_name

    const { t } = useTranslations('common')

    const pet = data?.pet_information
    const specie = (pet?.specie as string)?.toLowerCase()
    const race = (pet?.race as string)?.toLowerCase()
    const date_of_birth = pet?.date_birth
    const color = pet?.color
    const castrated = pet?.castrated as string
    const size = pet?.size
    const sex = pet?.sex as string

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
                                {`${pet.name_pet}, ${t(specie as string)}, ${t(
                                    race,
                                )}`}
                            </span>
                        </p>
                    )}
                    {
                        <p className="flex justify-between text-gray-500">
                            <strong className="mr-2">Data de Nascimento:</strong>
                            {date_of_birth}
                        </p>
                    }

                    {color && (
                        <p className="flex justify-between text-gray-500">
                            <strong className="mr-2">Cor:</strong>
                            {t(color?.toLowerCase() || 'unknown')}
                        </p>
                    )}

                    {size && (
                        <p className="flex justify-between text-gray-500">
                            <strong className="mr-2">Tamanho:</strong>
                            {t(size?.toLowerCase() || 'unknown')}
                        </p>
                    )}

                    {
                        <p className="flex justify-between text-gray-500">
                            <strong className="mr-2">Sexo:</strong>
                            {t(sex?.toLowerCase() || 'unknown')}
                        </p>
                    }

                    {castrated && (
                        <p className="flex justify-between text-gray-500">
                            <strong className="mr-2">Castrado:</strong>
                            {t(castrated || 'unknown')}
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

export default PetWasVerify
