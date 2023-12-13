import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { IScheduledAppointmentVet } from "~/store/slices/appointment-vet/types"

type mockAppointment = {
    question: string;
    answer: string;
    treatment: string;
    idx: any;
    system: string;
}


const font = '/home/usuario/Documentos/Pawkeeprs/web-app/styles/assets/fonts/Kalnia-Regular.ttf'; // Substitua 'url_da_fonte.ttf' pela URL da fonte

Font.register({
    family: 'Kalnia', 
    src: font,
    format: 'truetype',
    fontStyle: 'normal',
    fontWeight: 'normal',
  });
  
const styles = StyleSheet.create({
  globalStyles: {
    fontFamily: 'Kalnia',
        },
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  sectionLeft: {
    width: '30%',
    marginRight: '5%',
    textAlign: 'center',
  },
  sectionLeft2: {
    textAlign: 'center',
    alignItems: 'flex-end',
    width: '50%',
  },
  sectionRight: {
    width: '70%',
    textAlign: 'left',
  },
  sectionCenter: {
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: '27%',
    borderRadius: 50,
    alignItems: 'center',
    height: 'auto',
    backgroundColor: '#23b757',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  info: {
    fontSize: 12,
    marginBottom: 5,
  },
  h2: {
    fontSize: 14,
    marginTop: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    fontSize: 12,
    marginBottom: 5,
  },
});

const mockAppointment = {
    id: 'd5babb48-dd33-48e5-8a54-46103beaf5ae',
    pet_data: {
      name_pet: 'Ravena Dias Duarte',
      microchip: null,
      identification_number: null,
      specie: 'Gato',
      race: 'Siamês',
      blood_type: 'DEA_1.1_Positive',
      blood_donator: null,
      organ_donor: '',
      sex: 'Femea',
      date_birth: '0003-12-23'
    },
    vets_data: {
      name: 'Jaine dias',
      email: 'jainefranciellen@gmail.com',
      phone: '+55 (79) 9 9673-3389',
      country: '',
      zipCode: '49037-620',
      state: 'SE',
      city: 'Aracaju'
    },
    cpf_tutor: '09029941588',
    name_tutor: 'Jaine Franciellem',
    contact_tutor: 'ContactTutor',
    location_tutor: 'LocationTutor',
    responsible_tutors: 'ResponsibleTutors',
    health_insurance: 'HealthInsurance',
    id_pet: 'string',
    tutor_data: {
      name: 'Jaine franciellem santos dias',
      email: 'jainefranciellen@gmail.com',
      phone: '+55 (79) 9 9673-3389',
      country: 'Brasil',
      zipCode: '49037-620',
      state: 'SE',
      city: 'Aracaju'
    },
    crmv_vet: 'hg654694',
    cpf_cnpj_vet: '09029941588',
    vet_data:  {
        name: 'Dr Laercio Mota',
        email: 'laerciomota@gmail.com',
        phone: '+55 (79) 9 9673-3389',
        country: 'Brasil',
        zipCode: '49037-620',
        state: 'SE',
        city: 'Aracaju'
      },
    anamnesis: {
      digestive_system: [ {
        'O Animal está se alimentando normalmente?': 'Sim',
        'O Animal está bebendo água normalmente?': 'Sim',
        'O Animal está defecando?': 'Sim',
        'O Animal está vomitando?': 'Não',
      } ],
      respiratory_system: [ {
        'O Animal está espirrando?': 'Não',
        'O Animal está tossindo?': 'Não',
        'O Animal está com secreção nasal?': 'Não',
        'O Animal está com secreção ocular?': 'Não',
        'O Animal está com dificuldade respiratória?': 'Não',
      } ],
      locomotor_system: [ {
        'O Animal está mancando?': 'Não',
        'O Animal está com dificuldade de se locomover?': 'Não',
        'O Animal está com dificuldade de se levantar?': 'Não',
        'O Animal está com dificuldade de subir escadas?': 'Não',
      } ],
      urinary_system: [ {
        'O Animal está urinando normalmente?': 'Sim',
        'O Animal está com dificuldade para urinar?': 'Não',
        'O Animal está com urina escura?': 'Não',
        'O Animal está com urina com sangue?': 'Não',
      } ],
      nervous_system: [ {
        'O Animal está com convulsão?': 'Não',
        'O Animal está com tremores?': 'Não',
        'O Animal está com desmaios?': 'Não',
      } ]
    },
    info_required: {
        age: '7 anos',
        height: '20 cm',
        length: '30 cm',
        weight: '5 kg',
        type_weight: null,
        imc: '0.5',
        guidelines_notes: null
      },
    payments: {
        form_payment: null,
        value_payment: null,
        coin: null,
        number_installments: null,
        status_payment: null,
        date_payment: null
    },
    dates_consults: {
        date_consultation: '0067-07-06',
        time_consultation: '06:57',
        type_consultation: '65756',
        reason_consultation: '65756',
        additional_remarks: '',
        date_next_consultation: '',
        time_next_consultation: ''
    },
    appointment_status: {
      scheduled: 'yes',
      confirmed: 'no',
      done: 'no',
      canceled: 'no',
      rescheduled: 'no',
      reason_canceled: 'unforeseen'
    },
    appointment_signature: {
      signature_data: null,
      date_signature: null,
      type_signature: null,
      status_signature: null,
      ip_address: null,
      browser_device: null,
      operational_system: null
    },
    appointment_geolocation: {
      latitude: null,
      longitude: null,
      precision: null,
      altitude: null,
      speed: null
    },
    treatment: {
        'Testes Rápidos': [{'Teste 1': 'Positivo'}],
        'Aplicar Medicamentos': [
            {
                'Medicamento': 'Gaviz 10mg 1/4 do comprimido, de 12 em 12 horas, por 15 dias',
            },
            {
                'Medicamento': 'glutamina 4 gotas via oral, de 8 em 8 horas, por 30 dias',
            }
        ],
        'Aplicar Vacinas': [
            {
                'Vacina': 'V8 Subcutânea, 1/2 da dose 1 vez ao ano',
            },
            {
                'Vacina': 'Antirrábica Subcutânea, 1/2 da dose 1 vez ao ano',
            }
        ],
        'Aplicar Exames': [
            {
                'Exame': 'Hemograma',
            },
            {
                'Exame': 'Ultrassom',
            }
        ],
        'Aplicar nutrição alimentar': [
            {
                'Nutrição': 'Ração Premium 3 vezes ao dia',
            },
            {
                'Nutrição': 'Sachê 1 vez ao dia',
            }
        ],

    },
    dental_treatment: {
      reason_query: null,
      oral_examination: null,
      treatments_performed: [],
      recommendations: null
    },
    well_being: { perform_activity: null, activities_carry: [] },
  }

const MyDocument = (Appointment: IScheduledAppointmentVet) => {
  const clinicImage = '/home/usuario/Documentos/Pawkeeprs/web-app/styles/assets/images/faq-img.png'; // Substitua 'url_da_imagem_da_clinica_veterinaria.jpg' pela URL da imagem da clínica veterinária

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <div className='flex'>
                    <View style={styles.flex}>
                        <View style={styles.sectionRight}>
                            <Text style={styles.title}>Veterinário</Text>
                            <Text style={styles.info}>Nome: {mockAppointment.vet_data.name}</Text>
                            <Text style={styles.info}>Telefone: {mockAppointment.vet_data.phone}</Text>
                            <Text style={styles.info}>Email: {mockAppointment.vet_data.email}</Text>
                        </View>
                        <View style={styles.sectionLeft2}>
                            <Image src={clinicImage} style={styles.image} />
                        </View>
                    </View>
            <View style={styles.sectionCenter}>
                <Text style={styles.title}>Consulta</Text>
            </View>
                <View style={styles.sectionRight}>
                    {/* Adicione informações do pet*/}
                    <Text style={styles.h2}>Pet</Text>
                    <Text style={styles.flex}>Nome..........................................{mockAppointment.pet_data.name_pet}</Text>
                    <Text style={styles.flex}>Espécie........................................{mockAppointment.pet_data.specie}</Text>
                    <Text style={styles.flex}>Raça.................................................{mockAppointment.pet_data.race }</Text>
                    <Text style={styles.flex}>Sexo................................................{mockAppointment.pet_data.sex }</Text>
                    <Text style={styles.flex}>Idade...............................................{mockAppointment.pet_data.date_birth }</Text>

                </View>

                <View style={styles.sectionRight}>
                    {/* Adicione flexrmações do tutor*/}
                    <Text style={styles.h2}>Tutor</Text>
                    <Text style={styles.flex}>Nome.................................{mockAppointment.tutor_data.name}</Text>
                    <Text style={styles.flex}>Email................................{mockAppointment.tutor_data.email}</Text>
                    <Text style={styles.flex}>Telefone.............................{mockAppointment.tutor_data.phone}</Text>
                </View>
         <div className='flex'>
            <View style={styles.sectionCenter}>
                <Text style={styles.title}>Anamnese</Text>
            </View>
            <View>
                {Object.keys(mockAppointment?.anamnesis).map((system, index) => (
                    <View key={index}>
                        {mockAppointment?.anamnesis[system].map((questions: mockAppointment, idx: mockAppointment) => (
                        <View key={idx}>
                            {Object.entries(questions).map(([question, answer], i) => (
                                <div key={i} style={styles.flex}>
                                    <Text>{question}</Text>
                                    <Text>{answer}</Text>
                                </div>
                            ))}
                        </View>
                        ))}
                    </View>
                ))}    
            </View>
         </div>
        </div>
      </Page>
      <Page size="A4" style={styles.page}>
        <div className='flex'>
            <View style={styles.sectionCenter}>
                <Text style={styles.title}>Tratamento</Text>
            </View>
            <View>
                {Object.keys(mockAppointment?.treatment).map((treatmentType, index) => (
                    <View key={index}>
                        <Text style={styles.h2}>{treatmentType}</Text>
                        {mockAppointment?.treatment[treatmentType].map((treatment: mockAppointment, idx: mockAppointment) => (
                            <View key={idx}>
                                {Object.entries(treatment).map(([treatment, answer], i) => (
                                    <div key={i} >
                                        <Text style={styles.info}> {treatment}: {answer}</Text>
                                    </div>
                                ))}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </div>
      </Page>
    </Document>
  );
};

export default MyDocument;