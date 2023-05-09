import DashboardLayouts from "../_layouts/dashboard";

import Container from "react-bootstrap/Container";

import { VeterinaryAppointment } from "~/store/veterinary-appointments/types";
import VerticalTabs from "./components/templates/vertical-tabs";

import { Formik } from 'formik';

export type InitialValues = Partial<Nullable<VeterinaryAppointment>>;

type AppointmentsPageProps = {
    document: string
}

const initialValues = (document = null): InitialValues => ({
    pet: {
        id: null,
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
        document: document,
    },
    treatments: [],
    diseases: [],
    vaccines: [],
    exams: [],
})

const AppointmentsPage = ({ document }: AppointmentsPageProps) => {

    const handleSubmit = (values: InitialValues) => {
        console.log(values)
    }

    return (
        <DashboardLayouts title="Nova Consulta">
            <Formik
                onSubmit={handleSubmit}
                enableReinitialize
                initialValues={initialValues(document as any)}
            >
                <Container>
                    <VerticalTabs />
                </Container>
            </Formik>
        </DashboardLayouts>
    )
}

export default AppointmentsPage