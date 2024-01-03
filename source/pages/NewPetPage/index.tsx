import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Pet } from '~/entities/Pet';
import usePetsByDocument from '~/store/hooks/list-pets-of-tutor';
import DashboardLayouts from "../_layouts/dashboard";
import Tabs from './components/templates/vertical-tabs';


import { BtnCancel } from "~/Components/atoms/btn";
import ModalConfirm from "~/Components/modals/modal-confirm";
import { Veterinary } from '~/entities/Veterinary';
import useProfileVeterinary from '~/hooks/use-veterinary';
import { IPet } from '~/types/pet';

export type InitialValues = Nullable<IPet>;

type MakeInitialValuesProps = {
    cpf_tutor: string
    name_tutor?: string
    phone?: string
    email?: string
    whatsapp?: string
    veterinary?: Veterinary
}
type MakeInitialValues = (props: MakeInitialValuesProps) => InitialValues

const makeInitialValues: MakeInitialValues = ({
    cpf_tutor,
    name_tutor = null,
    phone = null,
    email = null,
    whatsapp = null,
    veterinary = null
}) => ({
    id: null,
    cpf_tutor,
    name_tutor,
    blood_donator: null,
    blood_type: null,
    castrated: 'no',
    identification_number: null,
    microchip: null,
    name_pet: '',
    organ_donor: 'no',
    breed: null,
    gender: null,
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
            city: '',
            complement: '',
            country: 'BR',
            neighborhood: '',
            number: '',
            state: '',
            street: '',
            zipCode: '',
        },
        avatar: '',
        id: '',
        name: '',
    },
    name: '',
    veterinary,

})

type PetPageProps = {
    document: string
}

const NewPetPage = ({ document }: PetPageProps) => {

    const { activeData, handleSubmit } = usePetsByDocument(document)
    const pets = useMemo(() => activeData || [], [activeData])
    const veterinary = useProfileVeterinary()
    const router = useRouter()

    const initialValues = useMemo(() => makeInitialValues({
        cpf_tutor: document,
        email: pets[0]?.main_responsible_guardian.contact?.email as string,
        name_tutor: pets[0]?.main_responsible_guardian.name as string,
        phone: pets[0]?.main_responsible_guardian.contact?.phone as string,
        whatsapp: pets[0]?.main_responsible_guardian.contact?.whatsapp as string,
        veterinary,
    }), [pets, document, veterinary]) as IPet

    const onSubmit = useCallback(async (values: IPet) => {
        const petData = Pet.build(values)

        try {
            const data = await handleSubmit(petData as any)
            if (data) router.push('/dashboard')
        } catch (error) {
            console.log(error)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleSubmit])

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
                    <Tabs />
                </div>
            </Formik>
        </DashboardLayouts>
    )
}

export default NewPetPage