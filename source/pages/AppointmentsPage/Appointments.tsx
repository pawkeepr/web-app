import DashboardLayouts from "../_layouts/dashboard";

import { BOOL_STATUS, IAppointmentVet } from "~/store/slices/appointment-vet/types";
import VerticalTabs from "./components/templates/vertical-tabs";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { BtnCancel } from "~/Components/atoms/btn";
import ModalConfirm from "~/Components/modals/modal-confirm";
import { Appointments } from "~/entities/Appointments";
import useAppointment from "~/store/hooks/appointment/use-appointment";
import usePetById from "~/store/hooks/pet/use-pets";
import { IPetV2 } from "~/types/pet-v2";
import { geolocation } from "~/utils/geolocation";

export type InitialValues = IAppointmentVet;

type AppointmentsPageProps = {
    document: string;
    pet: string;
};

const initialValues = (
    {
        id: id_pet,
        pet_data,
        contact_tutor,
        cpf_tutor,
        health_insurance,
        location_tutor,
        name_tutor,
        phone_tutor,
        responsible_tutors,
        vets_data,
    }: IPetV2,
): InitialValues => ({
    pet_data: pet_data as any,
    vets_data: [
        // dados mockados, retirar quando estiver os dados com o retorno da Api
        {
            "name_vet": "Veterinary guy",
            "crmv_vet": "SP12345",
            "cpf_cnpj_vet": "00100200352"
        }
    ],
    contact_tutor,
    location_tutor,
    responsible_tutors,
    id: null,
    id_pet: id_pet as string,
    cpf_tutor,
    tutor_data: {
        name: '',
        email: '',
        phone: '',
        country: '',
        zipCode: '',
        state: '',
        city: ''
    },
    crmv_vet: '',
    cpf_cnpj_vet: '',
    vet_data: {
        name: '',
        email: '',
        phone: '',
        country: '',
        zipCode: '',
        state: '',
        city: ''
    },
    medicines: [],
    anamnesis: {
        digestive_system: [
            {
                question: "",
                options: ""
            }
        ],
        respiratory_system: [
            {
                question: "",
                options: ""
            }
        ],
        locomotor_system: [
            {
                question: "",
                options: ""
            }
        ],
        urinary_system: [
            {
                question: "",
                options: ""
            }
        ],
        nervous_system: [
            {
                question: "",
                options: ""
            }
        ]
    },
    vaccines: [],
    exams: [],
    nutritions: [],
    illnesses: [],
    info_required: {
        age: "",
        height: "",
        length: "",
        weight: "",
        type_weight: "",
        imc: "",
        guidelines_notes: ""
    },
    payments: {
        form_payment: "",
        value_payment: "",
        coin: "",
        number_installments: "",
        status_payment: "",
        date_payment: ""
    },
    dates_consults: {
        date_consultation: "",
        time_consultation: "",
        type_consultation: "",
        reason_consultation: "",
        additional_remarks: "",
        date_next_consultation: "",
        time_next_consultation: ""
    },
    appointment_status: {
        scheduled: BOOL_STATUS.TRUE,
        confirmed: BOOL_STATUS.TRUE,
        done: BOOL_STATUS.FALSE,
        canceled: BOOL_STATUS.FALSE,
        reason_canceled: BOOL_STATUS.FALSE,
    },
    appointment_signature: {
        ip_address: "",
        browser_device: "",
        operational_system: "",
    },
    appointment_geolocation: {
        latitude: "",
        longitude: "",
        precision: "",
        altitude: "",
        speed: ""
    },
    dental_treatment: {
        reason_query: "",
        oral_examination: "",
        treatments_performed: [],
        recommendations: ""
    },
    well_being: {
        perform_activity: "",
        activities_carry: []
    },
    health_insurance,
    name_tutor: name_tutor as string,
    tests_fasts: [],
    digestive_system: false,
    locomotor_system: false,
    nervous_system: false,
    respiratory_system: false,
    urinary_system: false,
    apply_disease: false,
    apply_exam: false,
    apply_fast_test: false,
    apply_medicine: false,
    apply_nutrition: false,
    apply_vaccine: false,
});


const AppointmentsPage = ({ document, pet }: AppointmentsPageProps) => {

    const router = useRouter();

    const { data, isLoading: isLoadingPet, isError } = usePetById(document, pet)
    const { handleSubmit } = useAppointment();

    const onSubmit = async (values: InitialValues) => {
        const appointment = Appointments.build(values);
        const [geolocationData, signature] = await geolocation();
        appointment
            .defineAppointmentGeolocation(geolocationData)
            .defineAppointmentSignature(signature);
        await handleSubmit(appointment as any);
    };

    if (isError) return router.back();

    return (


        <Formik
            onSubmit={onSubmit}
            enableReinitialize
            initialValues={initialValues(data as IPetV2)}
        >
            <DashboardLayouts title="Nova Consulta" >
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

                    <VerticalTabs isLoading={isLoadingPet} />
                </div>
            </DashboardLayouts>
        </Formik>

    );
};

export default AppointmentsPage;
