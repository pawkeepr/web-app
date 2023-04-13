import DashboardLayouts from "../_layouts/dashboard";

import Container from "react-bootstrap/Container";

import { VeterinaryAppointment } from "~/store/veterinary-appointments/types";
import VerticalTabs from "./components/templates/vertical-tabs";

import { Formik } from 'formik';

export type InitialValues = Partial<Nullable<VeterinaryAppointment>>;

const initialValues: InitialValues = {
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
        document: null,
    },
    treatments: [],
    diseases: [],
    vaccines: [],
    exams: [],
}

const AppointmentsPage = () => {

    const handleSubmit = (values: InitialValues) => {
        console.log(values)
    }

    return (
        <DashboardLayouts title="Nova Consulta">
            <Formik
                onSubmit={handleSubmit}
                enableReinitialize
                initialValues={initialValues}
            >
                <Container>
                    <VerticalTabs />
                </Container>
            </Formik>
        </DashboardLayouts>
    )
}

export default AppointmentsPage