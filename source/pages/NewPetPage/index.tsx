import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import usePetsByDocument from '~/store/hooks/list-pets-of-tutor';
import DashboardLayouts from "../_layouts/dashboard";
import Tabs from './components/templates/vertical-tabs';


import { BtnCancel } from "~/Components/atoms/btn";
import ModalConfirm from "~/Components/modals/modal-confirm";
import { Veterinary } from '~/entities/Veterinary';
import useProfileVeterinary from '~/hooks/use-veterinary';
import { IPet } from '~/types/pet';
import { Address } from '~/validations/address';

export type InitialValues = Nullable<IPet>;

type MakeInitialValuesProps = {
    cpf_tutor: string
    name_tutor?: string
    phone?: string
    email?: string
    whatsapp?: string
    veterinary?: Veterinary
    address?: Address
}
type MakeInitialValues = (props: MakeInitialValuesProps) => InitialValues

export const makeInitialValues: MakeInitialValues = ({
    cpf_tutor,
    name_tutor = null,
    phone = null,
    email = null,
    whatsapp = null,
    veterinary = null,
    address = null
}) => ({
    id: null,
    cpf_tutor,
    blood_donator: null,
    blood_type: null,
    castrated: 'no',
    identification_number: null,
    microchip: null,
    name_pet: '',
    organ_donor: 'no',
    race: 'unknown',
    sex: 'unknown',
    specie: null,
    date_birth: null,
    phone_tutor: phone,
    ownerEmergencyContact: {
        cpf_cnpj: '',
        email: email || '',
        phone: phone || '',
        whatsapp: whatsapp || phone || '',
        lastName: '',
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
        name: name_tutor || '',
    },
    name: '',
    veterinary,

})

type PetPageProps = {
    document: string
}

const NewPetPage = ({ document }: PetPageProps) => {

    const { activeData, handleSubmit, isLoading } = usePetsByDocument(document, 'full')
    const pets = useMemo(() => activeData || [], [activeData])
    const veterinary = useProfileVeterinary()
    const router = useRouter()

    const initialValues = useMemo(() => {
        const fullName = pets[0]?.main_responsible_guardian.first_name + ' ' + pets[0]?.main_responsible_guardian.last_name
        const trimmedName = fullName.trim()

        return makeInitialValues({
            cpf_tutor: document,
            email: pets[0]?.main_responsible_guardian.contact?.email as string,
            name_tutor: trimmedName,
            phone: pets[0]?.main_responsible_guardian.contact?.phone as string,
            whatsapp: pets[0]?.main_responsible_guardian.contact?.whatsapp as string,
            veterinary,
            address: pets[0]?.main_responsible_guardian.address as Address
        })
    }, [pets, document, veterinary]) as IPet

    const onSubmit = useCallback(async (values: IPet) => {
        try {
            const data = await handleSubmit(values)
            if (data) router.push('/dashboard')
        } catch (error) {
            console.log(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleSubmit])

    const tutorExist = useMemo(() => pets.length > 0, [pets])

    return (
        <DashboardLayouts title="Novo Pet"  >
            <Formik
                onSubmit={onSubmit}
                enableReinitialize
                initialValues={initialValues}
            >
                <div className="gap-2 mt-2 mobile:py-6">
                    <ModalConfirm
                        title="Cancelar Novo Pet!"
                        onConfirm={() => router.push("/dashboard")}
                        description="Importante!"
                        message="Esta ação irá cancelar todas as operações realizadas até o momento, deseja continuar?"
                    >
                        {({ onChangeOpen }) => {
                            return (
                                <BtnCancel
                                    type="button"
                                    label="Cancelar"
                                    onClick={() => onChangeOpen(true)}
                                />


                            );
                        }}
                    </ModalConfirm>
                    <Tabs isPending={isLoading} tutorExist={tutorExist} />
                </div>
            </Formik>
        </DashboardLayouts>
    )
}

export default NewPetPage