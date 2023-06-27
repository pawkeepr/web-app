import DashboardLayouts from "../_layouts/dashboard";

import Container from "react-bootstrap/Container";

import { VeterinaryAppointment } from "~/store/veterinary-appointments/types";
import VerticalTabs from "./components/templates/vertical-tabs";

import { Formik } from 'formik';

export type InitialValues = Partial<Nullable<VeterinaryAppointment>>;

type AppointmentsPageProps = {
    document: string
    pet?: string
}

type NullString = string | null

const initialValues = (document: NullString = null, id: NullString = null): InitialValues => ({
    pet: {
        id,
        name: null,
        castrated: null,
        breed: null,
        species: null,
        avatar: null,
        gender: null,
        dateOfBirth: null,
    },
    tutor: {
        id: null,
        name: null,
        email: null,
        phone: null,
        avatar: null,
        document,
    },
    treatments: [],
    diseases: [''],
    vaccines: [''],
    exams: [''],
    payment: {
        method: null,
        price: null,
        discount: null,
    }
})

const AppointmentsPage = ({ document, pet }: AppointmentsPageProps) => {

    const handleSubmit = (values: InitialValues) => {
        console.log(values)
    }


    return (
        <DashboardLayouts title="Nova Consulta">
            <Formik
                onSubmit={handleSubmit}
                enableReinitialize
                initialValues={initialValues(document, pet)}
            >
                <Container>
                    <VerticalTabs />
                </Container>
            </Formik>
        </DashboardLayouts>
    )
}

export default AppointmentsPage