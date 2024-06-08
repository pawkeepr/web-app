import { Formik } from 'formik'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import Tabs from './components/templates/vertical-tabs'

import cn from 'classnames'
import { FaEdit, FaEye } from 'react-icons/fa'
import { BtnIcon } from '~/Components/atoms/btn'
import { ModeInput } from '~/Components/molecules/field-control/field-control'
import type { Veterinary } from '~/entities/Veterinary'
import useProfileVeterinary from '~/hooks/use-profile-veterinary'
import usePetById from '~/store/hooks/pet-by-id/use-pets'
import useProfile from '~/store/hooks/profile/use-profile'
import type { BloodType } from '~/types/bloodType'
import type { Breed } from '~/types/breedType'
import type { IPet } from '~/types/pet'
import type { IPetV2 } from '~/types/pet-v2'
import { TypeProfile, type Location } from '~/types/profile'
import type { Gender, Species } from '~/types/speciesType'
import { useModeEditablePet } from './components/hooks/use-mode-editable-pet'

export type InitialValues = Nullable<IPet>

type MakeInitialValuesProps = {
    id_pet?: string
    pet_information?: IPetV2['pet_information']
    cpf_tutor: string
    phone?: string
    email?: string
    whatsapp?: string
    veterinary?: Veterinary
    address?: Location
    first_name?: string
    last_name?: string
}
type MakeInitialValues = (props: MakeInitialValuesProps) => InitialValues

export const makeInitialValues: MakeInitialValues = ({
    id_pet = null,
    cpf_tutor,
    phone = null,
    email = null,
    whatsapp = null,
    veterinary = null,
    address = null,
    pet_information = null,
    first_name = null,
    last_name = null,
}) => {
    return {
        id: id_pet || pet_information?.id_pet || null,
        cpf_tutor,
        blood_donator: pet_information?.blood_donator === 'yes',
        blood_type: (pet_information?.blood_type as BloodType) || null,
        castrated: pet_information?.castrated === 'yes',
        identification_number: pet_information?.identification_number || '',
        pedigree: pet_information?.pedigree === 'yes',
        pedigree_registry: pet_information?.pedigree_registry || '',
        approximate_date: pet_information?.approximate_date || false,
        microchip: pet_information?.microchip || '',
        name_pet: pet_information?.name_pet || '',
        organ_donor: pet_information?.organ_donor === 'yes',
        race: (pet_information?.race as Breed) || null,
        sex: (pet_information?.sex as Gender) || null,
        specie: (pet_information?.specie as Species) || null,
        date_birth: pet_information?.date_birth || null,
        cpf_cnpj: cpf_tutor,
        phone_tutor: phone,
        ownerEmergencyContact: {
            cpf_cnpj: cpf_tutor,
            email: email || '',
            phone: phone || '',
            whatsapp: whatsapp || phone || '',
            last_name: last_name || '',
            address: {
                city: address?.city || '',
                complement: address?.complement || '',
                country: address?.country || '',
                neighborhood: address?.neighborhood || '',
                number: address?.number || '',
                state: address?.state || '',
                street: address?.street || '',
                zipCode: address?.zipCode || '',
            },
            avatar: '',
            id: '',
            first_name: first_name || '',
        },
        name: pet_information?.name_pet || '',
        veterinary: {
            ...veterinary,
            specialty: veterinary?.specialty || 'sem_especialidade',
            crmv: veterinary?.crmv || 'se0000',
        },
    }
}

type CreateOrUpdatePetPageProps = {
    document?: string
    id_pet?: string
}

type BasicPetInformation = {
    email: string
    phone: string
    whatsapp: string
    address: Location
    first_name: string
    last_name: string
    cpf_tutor: string
}

const CreateOrUpdatePetPage = ({
    document,
    id_pet,
}: CreateOrUpdatePetPageProps) => {
    const {
        activeData: pet,
        isLoading,
        handleSubmit,
    } = usePetById(document as string, id_pet as string)

    const { data: profile } = useProfile()

    const pathname = usePathname()
    const veterinary = useProfileVeterinary()
    const router = useRouter()

    const tutorInformation: BasicPetInformation = useMemo(() => {
        if (profile?.type_profile === TypeProfile.VETERINARY) {
            return {
                cpf_tutor: document as string,
                email: pet?.main_responsible_guardian?.contact?.email as string,
                phone: pet?.main_responsible_guardian?.contact?.phone as string,
                whatsapp: pet?.main_responsible_guardian?.contact
                    ?.whatsapp as string,
                address: pet?.main_responsible_guardian?.address as Location,
                first_name: pet?.main_responsible_guardian?.first_name as string,
                last_name: pet?.main_responsible_guardian?.last_name as string,
            }
        }

        if (profile?.type_profile === TypeProfile.TUTOR) {
            return {
                email: profile?.user_information?.contact?.email as string,
                phone: profile?.user_information?.contact?.phone as string,
                whatsapp: profile?.user_information?.contact?.whatsapp as string,
                address: profile?.user_information?.address as Location,
                first_name: profile?.user_information?.first_name as string,
                last_name: profile?.user_information?.last_name as string,
                cpf_tutor: profile?.user_information?.cpf_cnpj as string,
            }
        }

        return {} as BasicPetInformation
    }, [pet, profile, document])

    const initialValues = useMemo(() => {
        return makeInitialValues({
            id_pet,
            pet_information: pet?.pet_information,
            veterinary: veterinary || {},
            ...tutorInformation,
        })
    }, [pet, document, veterinary, id_pet]) as IPet

    const { mode, onChangeMode } = useModeEditablePet()
    const onSubmit = useCallback(
        async (values: IPet) => {
            try {
                router.prefetch('/dashboard')
                const data = await handleSubmit(values)
                if (data) router.push('/dashboard')
            } catch (_) {
                // console.log(error)
            }
        },
        [handleSubmit],
    )

    const hasPet = useMemo(() => {
        return !!pet?.id
    }, [pet])

    const changeMode = () => {
        if (mode === ModeInput.readonly) return onChangeMode('editable')

        onChangeMode(ModeInput.readonly)
    }

    const isRouteCreate = useMemo(
        () => pathname === '/veterinary/dashboard/pet' || pathname === '/tutor/pet',
        [pathname],
    )

    return (
        <Formik
            onSubmit={onSubmit}
            enableReinitialize
            initialValues={initialValues}
        >
            <div
                className="
                px-2
                gap-2 mt-2 relative bg-white w-full
                mobile:py-6 mobile:items-center mobile:flex mobile:!h-fit mobile:flex-col
                tablet:py-0 tablet:items-center tablet:flex tablet:!h-fit tablet:flex-col
              "
            >
                <BtnIcon
                    icon={
                        mode === 'editable' ? (
                            <span>
                                <FaEye className="w-5 h-5" />
                            </span>
                        ) : (
                            <span>
                                <FaEdit className="w-5 h-5" />
                            </span>
                        )
                    }
                    condition={!isRouteCreate}
                    type="button"
                    className={cn(
                        `
                            m-2 z-10
                            web:absolute web:right-0 web:top-0 web:w-32 web:p-1 web:m-0 web:h-fit 
                            web:text-gray-400 web:border-none mobile:w-40
                        `,
                        {
                            'bg-confirm-500 hover:bg-confirm-600 text-white':
                                mode === 'editable',
                            'bg-primary-500 hover:bg-primary-600 text-white':
                                mode !== 'editable',
                        },
                    )}
                    label={mode === 'editable' ? 'Visualizar' : 'Editar'}
                    onClick={changeMode}
                />
                <Tabs isPending={isLoading} hasTutor={hasPet} hasPet={hasPet} />
            </div>
        </Formik>
    )
}

export default CreateOrUpdatePetPage
