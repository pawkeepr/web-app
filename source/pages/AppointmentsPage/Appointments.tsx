import * as Yup from "yup";
import DashboardLayouts from "../_layouts/dashboard";

import { IAppointmentVet } from "~/store/appointment-vet/types";
import VerticalTabs from "./components/templates/vertical-tabs";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { BtnCancel } from "~/Components/atoms/btn";
import ModalConfirm from "~/Components/modals/modal-confirm";


export type InitialValues = Partial<Nullable<IAppointmentVet>>;

type AppointmentsPageProps = {
    document: string;
    pet?: string;
};

type NullString = string | null;

const initialValues = (
    document: NullString = null,
    id: NullString = null
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
    vets_data: [],
    contact_tutor: {
        email:  null,
        phone:  null,
        whatsapp:  null,
    },
    location_tutor: {
        country:  null,
        zipCode:  null,
        state:  null,
        city:  null,
        neighborhood:  null,
        street:  null,
        number:  null,
        complement:  null,
    },
    responsible_tutors: {
        name_tutor:  null,
        cpf_tutor:  null,
    },
    health_insurance: {
        name:  null,
        type_health:  null,
        number_health:  null,
        validity:  null,
  }    
});

const AppointmentsPage = ({ document, pet }: AppointmentsPageProps) => {

    const router = useRouter();

    const handleSubmit = (values: InitialValues) => {
        console.log({values})        
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
