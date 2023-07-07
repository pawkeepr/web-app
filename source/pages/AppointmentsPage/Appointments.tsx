import DashboardLayouts from "../_layouts/dashboard";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";

import { VeterinaryAppointment } from "~/store/veterinary-appointments/types";
import VerticalTabs from "./components/templates/vertical-tabs";

import { Formik } from "formik";

export type InitialValues = Partial<Nullable<VeterinaryAppointment>>;

type AppointmentsPageProps = {
    document: string;
    pet?: string;
};

type NullString = string | null;

const initialValues = (
    document: NullString = null,
    id: NullString = null
): InitialValues => ({
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

    medicines: [
        {
            name_medicine: "",
            brand: "",
            continuous_use: "",
            amount: "",
            type_medicine: "",
            interval: "",
            period: "",
            date_init: "",
            date_end: "",
        },
    ],

    diseases: [
        {
            name: "",
            typeDisease: "",
            severity: "",
            description: "",
        },
    ],
    nutritions: [
        {
            food_name: "",
            food_start_time: "",
            amount: "",
            measure: "",
            interval: "",
            period: "",
        },
    ],
    vaccines: [""],
    exams: [""],
    payment: {
        method: null,
        price: null,
        discount: null,
    },
});

const AppointmentsPage = ({ document, pet }: AppointmentsPageProps) => {
    const handleSubmit = (values: InitialValues) => {
        const valuesAltered = {
            name_pet: values.pet?.name,
            pet_data: {
                species: values.pet?.species,
                race: values.pet?.breed,
                blood_type: values.pet?.bloodType,
            },
            vets: ["0121545"],
            cpf_tutor: values.tutor?.document,
            name_tutor: values.tutor?.name,
            contact_tutor: {
                email: values.tutor?.email,
                phone: values.tutor?.phone,
            },
            location_tutor: {
                address: values.tutor?.address?.street,
                city: values.tutor?.address?.city,
                state: values.tutor?.address?.state,
                zipCode: values.tutor?.address?.zipCode,
            },
            diseases: values.diseases,
        };
        console.log(valuesAltered);
    };

    return (
        <DashboardLayouts title="Nova Consulta">
            <Formik
                onSubmit={handleSubmit}
                enableReinitialize
                initialValues={initialValues(document, pet)}
                validationSchema={Yup.object().shape({
                    diseases: Yup.array().of(
                        Yup.object().shape({
                            name: Yup.string().required("Required"),
                            typeDisease: Yup.string().required("Required"),
                            description: Yup.string().required("Required"),
                            severity: Yup.string().required("Required"),
                        })
                    ),
                })}
            >
                <Container>
                    <VerticalTabs />
                </Container>
            </Formik>
        </DashboardLayouts>
    );
};

export default AppointmentsPage;
