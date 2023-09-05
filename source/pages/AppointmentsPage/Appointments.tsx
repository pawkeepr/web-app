import DashboardLayouts from "../_layouts/dashboard";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";

import { VeterinaryAppointment } from "~/store/veterinary-appointments/types";
import VerticalTabs from "./components/templates/vertical-tabs";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { BtnCancel } from "~/Components/atoms/btn";
import ModalConfirm from "~/Components/modals/modal-confirm";


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
        sex: null,
        date_birth: null,
        chip_number: null,
        id_office_register: null,
    },
    tutor: {
        id: null,
        name: null,
        email: null,
        phone: null,
        avatar: null,
        document,
    },
    secundTutor: {
        id: null,
        name: null,
        email: null,
        phone: null,
        avatar: null,
        document,
    },
    treatments: [],
    speciality: '',
    sub_specialty: null,
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
    tests: [
        {   type: "",
            result: "",
            comments: "",
           
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
        payment_method: undefined,
        price: 0,
        
        



    },
});

const AppointmentsPage = ({ document, pet }: AppointmentsPageProps) => {

    const router = useRouter();

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
        <DashboardLayouts title="Nova Consulta" >
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
                <div className="gap-2 mt-2 mobile:py-6">

                    <ModalConfirm
                        title="Cancelar Consulta!"
                        onConfirm={() => router.push("/dashboard")}
                        description="Importante!"
                        message="Esta ação irá cancelar todas as operações realizadas até o momento, deseja continuar?"
                    >
                        {({ onChangeOpen }) => {
                            return (
                                <BtnCancel
                                    type="button"
                                    label="Cancelar Consulta"
                                    onClick={() => onChangeOpen(true)}
                                />


                            );
                        }}
                    </ModalConfirm>
                    <VerticalTabs />
                </div>
            </Formik>
        </DashboardLayouts>
    );
};

export default AppointmentsPage;
