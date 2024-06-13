'use client'

import cn from 'classnames'
import { BtnLink } from '~/Components/atoms/btn'
import AvatarPet from '~/Components/molecules/avatar-pet'
import { useTranslations } from '~/hooks/use-translations'
import { useMedicalRecordsPublic } from '~/store/hooks/pet-by-id'
import type { Species } from '~/types/speciesType'
import ListsMedicalRecords from '../HistoricPetPage/components/template/lists-medical-records'
import LoadingPage from '../LoadingPage'
type PetMedicalRecordsProps = {
    id_pet: string
}

const PetMedicalRecords = ({ id_pet }: PetMedicalRecordsProps) => {
    const { data, isPending } = useMedicalRecordsPublic(id_pet)

    const name_tutor =
        data?.main_responsible_guardian?.name ||
        data?.main_responsible_guardian?.first_name

    const { t } = useTranslations('common')

    const pet = data?.pet_information

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
        <section
            className={cn(
                'flex flex-1 content-center mobile:content-start items-center justify-center mobile:items-start mobile:justify-start mobile:overflow-hidden ',
            )}
        >
            <section
                className={cn(
                    'grid mobile:flex-1 mobile:min-h-screen mobile:flex-col mobile:!grid-cols-1 mobile:!h-full mobile:!w-full z-10 shadow-2xl rounded-lg mobile:rounded-none mobile:shadow-none mobile:overflow-hidden mobile:bg-white w-[80%] grid-cols-1 my-4',
                )}
            >
                <div
                    className={cn(
                        `
                                !overflow-hidden relative mobile:rounded-r-none 
                                mobile:rounded-none grid grid-cols-1 mobile:!w-full 
                                mobile:!min-h-full py-4 px-12 
                                mobile:py-2 mobile:px-4 bg-white rounded-xl
                            `,
                    )}
                >
                    <div
                        className="flex h-40 mobile:h-36 w-full !bg-contain !bg-no-repeat !bg-center"
                        style={{
                            background: 'url(/logo-default.webp)',
                        }}
                    />
                    <section className="flex justify-start w-full p-4 mt-2 web:flex-row mobile:flex-col">
                        <picture className="flex justify-center flex-1 ">
                            <AvatarPet
                                classNames={{
                                    img: 'mobile:!w-32 mobile:!h-32',
                                }}
                                name_pet={pet?.name_pet as string}
                                specie={pet?.specie as Species}
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
                                        {`${pet.name_pet}, ${t(
                                            pet.specie as string,
                                        )}, ${t(pet.race as string)}`}
                                    </span>
                                </p>
                            )}
                            <hr className="w-full border-gray-600 dark:border-gray-700" />
                        </div>
                    </section>

                    <ListsMedicalRecords data={data} />
                    <div className="flex flex-col items-center justify-center w-full ">
                        <p className="-mb-2 font-normal text-gray-400">
                            Você não tem uma conta? Crie agora mesmo e obtenha todos
                            os benefícios da plataforma
                        </p>
                        <BtnLink message="Criar Conta" href="/sign-up" />
                    </div>
                </div>
            </section>
        </section>
    )
}

export default PetMedicalRecords
