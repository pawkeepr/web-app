import DashboardLayouts from "../_layouts/dashboard";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";

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
    id: null,
    id_pet: null,
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
    crmv_vet: null,
    cpf_cnpj_vet: null,
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
      {
        name_exame: "",
        local: "",
        realization_date: "",
        appointament_date: "",
        time_date: "",
        who_applied: "",
        health_insurance: "",
        type_exame: "",
        value_exam: "",
        coin_exam: ""
      }
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
    appointment_geolocation: {
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
});

const AppointmentsPage = ({ document, pet }: AppointmentsPageProps) => {

    const router = useRouter();

    const handleSubmit = (values: InitialValues) => {
        const valuesAltered = {
                id: values.id ,
                id_pet: values.id_pet,
                pet_data: {
                  name_pet: values.pet_data?.name_pet,
                  microchip: values.pet_data?.microchip,
                  identification_number: values.pet_data?.identification_number,
                  specie: values.pet_data?.specie,
                  race: values.pet_data?.race,
                  blood_type: values.pet_data?.blood_type,
                  blood_donator: values.pet_data?.blood_donator,
                  organ_donor: values.pet_data?.organ_donor,
                  sex: values.pet_data?.sex,
                  date_birth: values.pet_data?.date_birth,
                },
                cpf_tutor: values.cpf_tutor,
                tutor_data: {
                  name: values.tutor_data?.name,
                  email: values.tutor_data?.email,
                  phone: values.tutor_data?.phone,
                  country: values.tutor_data?.country,
                  zipCode: values.tutor_data?.zipCode,
                  state: values.tutor_data?.state,
                  city: values.tutor_data?.city
                },
                crmv_vet: values.crmv_vet,
                cpf_cnpj_vet: values.cpf_cnpj_vet,
                vet_data: {
                  name: values.tutor_data?.name,
                  email: values.tutor_data?.email,
                  phone: values.tutor_data?.phone,
                  country: values.tutor_data?.country,
                  zipCode: values.tutor_data?.zipCode,
                  state: values.tutor_data?.state,
                  city: values.tutor_data?.city,
                },
                medicines: [
                  {
                    name_medicine: 'Simparic 40mg',
                    brand: "Zoetis",
                    continuous_use: "Sim",
                    amount: "2",
                    type_medicine: "Comprimidos",
                    interval: "Sim",
                    period: "Sim",
                    date_init: "2023-07-05",
                    date_end: "2023-07-05",
                    value_mediccine: "89.90",
                    coin_mediccine: "Real"
                  }
                ],
                anamnesis: {
                  digestive_system: [
                    {
                      question: "O Animal está se alimentando?",
                      options: "Sim"
                    }
                  ],
                  respiratory_system: [
                    {
                      question: "O Animal apresenta secreção nasal ou ocular?",
                      options: "Sim"
                    }
                  ],
                  locomotor_system: [
                    {
                      question: "O Animal apresenta dificuldade para andar?",
                      options: "Sim"
                    }
                  ],
                  urinary_system: [
                    {
                      question: "O Animal apresenta dificuldade para urinar?",
                      options: "Sim"
                    }
                  ],
                  nervous_system: [
                    {
                      question: "O Animal apresenta convulsões?",
                      options: "Sim"
                    }
                  ]
                },
                vaccines: [
                  {
                    name_vaccine: "Vacina múltipla para cães (DAPP)",
                    brand: "Tesla",
                    batch: "102023",
                    local: "Veterinary clinic",
                    dose: "1º Dose",
                    date_application: "2023-07-05",
                    date_next_application: "2023-08-07",
                    who_applied: "Elisrenan",
                    health_insurance: "Unimed",
                    value_vaccine: "89.90",
                    coin_vaccine: "Real"
                  }
                ],
                exams: [
                  {
                    name_exame: "Vacina múltipla para cães (DAPP)",
                    local: "Veterinary clinic",
                    realization_date: "2023-07-05",
                    appointament_date: "2023-08-07",
                    time_date: "07:00",
                    who_applied: "Elisrenan",
                    health_insurance: "Unimed",
                    type_exame: "laboratory diagnosis",
                    value_exam: "89.90",
                    coin_exam: "Real"
                  }
                ],
                nutritions: [
                  {
                    food_name: "Carne",
                    food_start_time: "10:00",
                    amount: "20",
                    measure: "gramas",
                    interval: "2",
                    period: "Hours",
                    starting_date: "2023-07-05",
                    type_nutrition: "food",
                    value_nutrition: "89.90",
                    coin_nutrition: "Real"
                  }
                ],
                illnesses: [
                  {
                    name_illnese: "Erlichiose",
                    symptoms: "Febre alta, Tosse, Vômito, Diarreia, Depressão, Hematomas, Perda de apetite, Anemia...",
                    prevention: "Prevention of ehrlichiosis takes place through the monthly application of remedies ...",
                    treatment: "O tratamento é feito através do uso de medicamentos que podem variar a partir do...",
                    date_identified: "2023-07-05"
                  }
                ],
                info_required: {
                  age: "3",
                  height: "50",
                  length: "100",
                  weight: "60",
                  type_weigth: "gramas",
                  imc: "The patient is healthy",
                  guidelines_notes: "The patient is healthy"
                },
                payments: {
                  form_payment: "Pix",
                  value_payment: "89.90",
                  coin: "Real",
                  number_installments: "0",
                  status_payment: "paid",
                  date_payment: "2023-07-05T10:53:05.655079"
                },
                dates_consults: {
                  date_consultation: "2023-07-05",
                  time_consultation: "10:53",
                  type_consultation: "Exame",
                  reason_consultation: "Return consultation",
                  additional_remarks: "Client prioritary",
                  date_next_consultation: "2023-07-10",
                  time_next_consultation: "10:00"
                },
                appointment_status: {
                  scheduled: "yes",
                  confirmed: "yes",
                  done: "yes",
                  canceled: "no",
                  reason_canceled: "unforeseen"
                },
                appointment_signature: {
                  signature_data: "Undenfined",
                  date_signature: "2023-07-05T10:53:05.655079",
                  type_signature: "digital",
                  status_signature: "pending",
                  ip_adess: "192.175.64.7",
                  browser_device: "Google Chrome",
                  operational_system: "Windows 10"
                },
                appointment_geolocation: {
                  latitude: "-23.550520",
                  longitude: "-46.633308",
                  precision: "10 metros",
                  altitude: "760 meters above sea level",
                  speed: "0 meters per second"
                },
                tests_fasts: [
                  {
                    test_type: "e.g.",
                    result: "0.04",
                    notes: "Não reagente"
                  }
                ],
                dental_treatment: {
                    reason_query: "Any specific symptoms or problems that the owner has noticed",
                    oral_examination: "Tartar, or cavities, or inflammation, etc",
                    treatments_performed: [
                    "extractions",
                    "root canal"
                    ],
                    recommendations: "Scheduling follow-up appointments"
                    },
                    well_being: {
                    perform_activity: "yes",
                    activities_carry: [
                    "run",
                    "swim",
                    "play"
                    ]
                },
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
