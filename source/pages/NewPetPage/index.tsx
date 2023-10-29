import { Formik } from 'formik';
import { IPetV2 } from '~/types/pet-v2';
import DashboardLayouts from '../_layouts/dashboard/dashboard';
import Tabs from './components/templates/vertical-tabs';

export type InitialValues = Nullable<IPetV2>;

type MakeInitialValuesProps = {
    cpf_tutor: string
    name_tutor?: string
    phone?: string
    email?: string
    whatsapp?: string
}
type MakeInitialValues = (props: MakeInitialValuesProps) => InitialValues

const initialValues: MakeInitialValues = ({
    cpf_tutor,
    name_tutor = null,
    phone = null,
    email = null,
    whatsapp = null,
}) => ({
    contact_tutor: {
        email,
        phone,
        whatsapp,
    },
    cpf_tutor,
    health_insurance: {
        name: null,
        validity: null,
        number_health: null,
        type_health: null,
    },
    location_tutor: {
        city: null,
        neighborhood: null,
        state: null,
        street: null,
        complement: null,
        country: null,
        number: null,
        zipCode: null,
    },
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
    },
    phone_tutor: phone,
    responsible_tutors: {
        cpf_tutor: null,
        name_tutor: null,
    },
    vets_data: null,
})

type PetPageProps = {
    document: string
}

const NewPetPage = ({ document }: PetPageProps) => {

    const handleSubmit = (values: InitialValues) => {
        console.log(values)
    }

    return (
        <DashboardLayouts title="Novo Pet" >
            <Formik
                onSubmit={handleSubmit}
                enableReinitialize
                initialValues={initialValues({ cpf_tutor: document })}
            >
                <Tabs />

            </Formik>
        </DashboardLayouts>
    )
}

export default NewPetPage