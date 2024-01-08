import DashboardLayouts from "../_layouts/dashboard";

import { BOOL_STATUS } from "~/store/slices/appointment-vet/types";
import VerticalTabs from "./components/templates/vertical-tabs";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { BtnCancel } from "~/Components/atoms/btn";
import ModalConfirm from "~/Components/modals/confirm-modal";
import { Appointments } from "~/entities/Appointments";
import useProfileVeterinary from "~/hooks/use-veterinary";
import useAppointment from "~/store/hooks/appointment/use-appointment";
import usePetById from "~/store/hooks/pet/use-pets";
import { VeterinaryConsultation } from "~/types/appointment";
import { IPetV2 } from "~/types/pet-v2";
import { DTOProfile } from "~/types/profile";
import { geolocation } from "~/utils/geolocation";

export type InitialValues = VeterinaryConsultation;

type AppointmentsPageProps = {
    document: string;
    pet: string;
    appointment_id: string;
};

const initialValues = (
    {
        id: id_pet,
        pet_information,
        main_responsible_guardian,
        cpf_tutor,
        health_insurance,
    }: IPetV2,
    profile: DTOProfile,
    appointment_id: string,
): InitialValues => ({
    pet_data: pet_information as any,
    vets_data: [{
        name_vet: profile?.name_veterinary,
        crmv_vet: profile?.crmv,
        cpf_cnpj_vet: profile?.cpf_cnpj,
        email_vet: profile?.email,
        phone_vet: profile?.phone,
    }],
    contact_tutor: main_responsible_guardian?.contact,
    location_tutor: main_responsible_guardian?.address,
    id: appointment_id || null,
    id_pet: id_pet as string,
    cpf_tutor,
    tutor_data: {
        name: main_responsible_guardian?.name as string,
        email: main_responsible_guardian?.contact?.email || '',
        phone: main_responsible_guardian?.contact?.phone as string,
        country: main_responsible_guardian?.address?.country as string,
        zipCode: main_responsible_guardian?.address?.zipCode as string,
        state: main_responsible_guardian?.address?.state as string,
        city: main_responsible_guardian?.address?.city as string
    },
    crmv_vet: profile?.crmv,
    cpf_cnpj_vet: profile?.cpf_cnpj,
    veterinary: {
        cpf_cnpj: profile?.cpf_cnpj,
        crmv: profile?.crmv,
        name_veterinary: profile?.name_veterinary,
        specialty: profile?.specialty,
        email: profile?.email,
        phone: profile?.phone,
        whatsapp: profile?.whatsapp,
        country: profile?.country,
        state: profile?.state,
        city: profile?.city,
        neighborhood: profile?.neighborhood,
        street: profile?.street,
    },
    anamnesis: {
        physical_activity: [
            {
                question: "",
                options: ""
            }
        ],
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
        done: BOOL_STATUS.TRUE,
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
    well_being: {
        perform_activity: "",
        activities_carry: []
    },
    health_insurance,
    name_tutor: main_responsible_guardian?.name as string,
    digestive_system: false,
    locomotor_system: false,
    nervous_system: false,
    respiratory_system: false,
    urinary_system: false,
    treatments: [],
    dental_treatment: {
        treatments_performed: [],
        oral_examination: '',
        reason_query: '',
        recommendations: '',
    },
    responsible_tutors: {
        cpf_tutor: '',
        name_tutor: '',
    },
});


const AppointmentsPage = ({ document, pet, appointment_id }: AppointmentsPageProps) => {

    const router = useRouter();

    const { data, isLoading: isLoadingPet, isError } = usePetById(document, pet)
    const profile = useProfileVeterinary()

    const { handleSubmit } = useAppointment();

    const values = useMemo(() => initialValues(
        data as IPetV2,
        profile,
        appointment_id,
    ), [data, profile, appointment_id]
    );

    useEffect(() => {
        geolocation();
    }, []);

    const onSubmit = async (values: InitialValues) => {
        const appointment = Appointments.build(values);
        const [geolocationData, signature] = await geolocation();
        appointment
            .defineAppointmentGeolocation(geolocationData)
            .defineAppointmentSignature(signature);
        await handleSubmit(appointment as any);
        router.push("/dashboard");
    };

    if (isError) {
        router.back()
        return null
    };

    return (
        <Formik
            onSubmit={onSubmit}
            enableReinitialize
            initialValues={values}
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
