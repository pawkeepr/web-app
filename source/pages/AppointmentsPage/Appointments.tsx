import DashboardLayouts from "../_layouts/dashboard";

import { IAppointmentVet } from "~/store/slices/appointment-vet/types";
import VerticalTabs from "./components/templates/vertical-tabs";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { BtnCancel } from "~/Components/atoms/btn";
import ModalConfirm from "~/Components/modals/modal-confirm";
import { Appointments } from "~/entities/Apointments";


export type InitialValues = IAppointmentVet;

type AppointmentsPageProps = {
    document: string;
    pet?: string;
};

type NullString = string | null;


const initialValues = (
    document: NullString = null,
    id: NullString = null,
    geolocation: { latitude: string, longitude: string, precision: string, altitude: string, speed: string } | null = null
): InitialValues => ({
    pet_data: {
        id,
        name_pet: null,
        microchip: null,
        identification_number: null,
        specie: null,
        race: null,
        blood_type: null,
        blood_donator: null,
        organ_donor: null,
        sex: null,
        date_birth: null,
    },
    vets_data: [
        // dados mockados, retirar quando estiver os dados com o retorno da Api
        {
            "name_vet": "Veterinary guy",
            "crmv_vet": "SP12345",
            "cpf_cnpj_vet": "00100200352"
        }
    ],
    contact_tutor: {
        email: null,
        phone: null,
        whatsapp: null,
    },
    location_tutor: {
        country: null,
        zipCode: null,
        state: null,
        city: null,
        neighborhood: null,
        street: null,
        number: null,
        complement: null,
    },
    responsible_tutors: {
        name_tutor: null,
        cpf_tutor: null,
    },
    id: '',
    id_pet: '',
    pet_data: {
        name_pet: '',
        microchip: '',
        identification_number: '',
        specie: '',
        race: '',
        blood_type: '',
        blood_donator: '',
        organ_donor: '',
        sex: '',
        date_birth: ''
    },
    cpf_tutor: '',
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
            value_mediccine: "",
            coin_mediccine: ""
        }
    ],
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
    vaccines: [
        {
            name_vaccine: "",
            brand: "",
            batch: "",
            local: "",
            dose: "",
            date_application: "",
            date_next_application: "",
            who_applied: "",
            health_insurance: "",
            value_vaccine: "",
            coin_vaccine: ""
        }
    ],
    exams: [

    ],
    nutritions: [
        {
            food_name: "",
            food_start_time: "",
            amount: "",
            measure: "",
            interval: "",
            period: "",
            starting_date: "",
            type_nutrition: "",
            value_nutrition: "",
            coin_nutrition: ""
        }
    ],
    illnesses: [
        {
            name_illnese: "",
            symptoms: "",
            prevention: "",
            treatment: "",
            date_identified: ""
        }
    ],
    info_required: {
        age: "",
        height: "",
        length: "",
        weight: "",
        type_weigth: "",
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
        scheduled: "",
        confirmed: "",
        done: "",
        canceled: "",
        reason_canceled: ""
    },
    appointment_signature: {
        signature_data: "",
        date_signature: "",
        type_signature: "",
        status_signature: "",
        ip_adess: "",
        browser_device: "",
        operational_system: ""
    },
    appointment_geolocation: geolocation || {
        latitude: "",
        longitude: "",
        precision: "",
        altitude: "",
        speed: ""
    },
    tests_fasts: [
        {
            test_type: "",
            result: "",
            notes: ""
        }
    ],
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
    health_insurance: {
        name: null,
        type_health: null,
        number_health: null,
        validity: null,
    }
});


const AppointmentsPage = ({ document, pet }: AppointmentsPageProps) => {

    const router = useRouter();

    const handleSubmit = (values: InitialValues) => {
        try {
            const geolocation = () => {
                if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        const geolocationData = {
                            latitude: position.coords.latitude.toString(),
                            longitude: position.coords.longitude.toString(),
                            precision: position.coords.accuracy.toString(),
                            altitude: position.coords.altitude ? position.coords.altitude.toString() : '',
                            speed: position.coords.speed ? position.coords.speed.toString() : '',
                        };
                        const appointment = Appointments.build(initialValues(document, pet, geolocationData));
                        return appointment;
                    }, function (error) {
                        console.log(error);
                    });
                }
            };

            geolocation();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DashboardLayouts title="Nova Consulta" >
            <Formik
                onSubmit={handleSubmit}
                enableReinitialize
                initialValues={initialValues(document, pet)}
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
