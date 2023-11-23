import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Pet } from '~/entities/Pet';
import usePetsByDocument from '~/store/hooks/list-pets-of-tutor';
import { Breed } from '~/store/slices/pets/breedType';
import { Gender, Species } from '~/store/slices/pets/speciesType';
import { GenericSelect, IPetV2 } from '~/types/pet-v2';
import DashboardLayouts from "../_layouts/dashboard";
import Tabs from './components/templates/vertical-tabs';


import { BtnCancel } from "~/Components/atoms/btn";
import ModalConfirm from "~/Components/modals/modal-confirm";

export type InitialValues = Nullable<IPetV2>;

type MakeInitialValuesProps = {
    cpf_tutor: string
    name_tutor?: string
    phone?: string
    email?: string
    whatsapp?: string
}
type MakeInitialValues = (props: MakeInitialValuesProps) => InitialValues

const makeInitialValues: MakeInitialValues = ({
    cpf_tutor,
    name_tutor = null,
    phone = null,
    email = null,
    whatsapp = null,
}) => ({
    id: null,
    contact_tutor: {
        email,
        phone,
        whatsapp: whatsapp || phone,
    },
    cpf_tutor,
    health_insurance: {
        name: null,
        validity: null,
        number_health: null,
        type_health: null,
    },
    location_tutor: {
        country: 'Brasil',
        city: null,
        neighborhood: null,
        state: null,
        street: null,
        complement: null,
        number: null,
        zipCode: null,
    },
    has_second_tutor: false,
    name_tutor,
    pet_data: {
        blood_donator: null,
        blood_type: null,
        castrated: false,
        identification_number: null,
        microchip: null,
        name_pet: '',
        organ_donor: '',
        race: null,
        sex: null,
        specie: null,
        date_birth: null,
    },
    phone_tutor: phone,
    responsible_tutors: {
        cpf_tutor: null,
        name_tutor: null,
    },
    vets_data: [],
})

type PetPageProps = {
    document: string
}

const NewPetPage = ({ document }: PetPageProps) => {

    const { activeData: pets, handleSubmit } = usePetsByDocument(document)

    const router = useRouter()

    const initialValues = useMemo(() => makeInitialValues({
        cpf_tutor: document,
        email: pets[0]?.contact_tutor?.email as string,
        name_tutor: pets[0]?.name_tutor,
        phone: pets[0]?.contact_tutor?.phone as string,
        whatsapp: pets[0]?.contact_tutor?.whatsapp as string,
    }), [pets, document]) as IPetV2

    const onSubmit = useCallback(async (values: IPetV2) => {
        const petData = Pet.build({
            ...values,
            pet_data: {
                ...values.pet_data,
                race: (values.pet_data.race as GenericSelect).value as Breed,
                sex: (values.pet_data.sex as GenericSelect).value as Gender,
                specie: (values.pet_data.specie as GenericSelect).value as Species,
                blood_type: (values.pet_data.blood_type as GenericSelect).value as string,
            }
        })

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