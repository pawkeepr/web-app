import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// Estilos para o PDF
const styles = StyleSheet.create({
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
    marginTop: 20,
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
  },
  info: {
    fontSize: 12,
    marginBottom: 5,
  },
  h2: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 5,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
      digestive_system: [ {} ],
      respiratory_system: [ {} ],
      locomotor_system: [ {} ],
      urinary_system: [ {} ],
      nervous_system: [ {} ]
    },
    info_required: {
        age: 7,
        height: 20,
        length: 30,
        weight: 5,
        type_weight: null,
        imc: 2.000,
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
    dental_treatment: {
      reason_query: null,
      oral_examination: null,
      treatments_performed: [],
      recommendations: null
    },
    well_being: { perform_activity: null, activities_carry: [] },
  }

const MyDocument = () => {
  const clinicImage = '/home/usuario/Documentos/Pawkeeprs/web-app/styles/assets/images/faq-img.png'; // Substitua 'url_da_imagem_da_clinica_veterinaria.jpg' pela URL da imagem da clínica veterinária

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <div className='flex'>
                    <View style={styles.flex}>
                        <View style={styles.sectionRight}>
                            <Text style={styles.title}>Veterinário</Text>
                            <Text style={styles.info}>Nome: Dr. Exemplo</Text>
                            <Text style={styles.info}>Telefone: (XX) XXXX-XXXX</Text>
                            <Text style={styles.info}>Endereço: Endereço da Clínica</Text>
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
                    <Text style={styles.info}>Nome..........................................{mockAppointment.pet_data.name_pet}</Text>
                    <Text style={styles.info}>Espécie........................................{mockAppointment.pet_data.specie}</Text>
                    <Text style={styles.info}>Raça.................................................{mockAppointment.pet_data.race }</Text>
                    <Text style={styles.info}>Sexo................................................{mockAppointment.pet_data.sex }</Text>
                    <Text style={styles.info}>Idade...............................................{mockAppointment.pet_data.date_birth }</Text>

                </View>

                <View style={styles.sectionRight}>
                    {/* Adicione informações do tutor*/}
                    <Text style={styles.h2}>Tutor</Text>
                    <Text style={styles.info}>Nome.................................{mockAppointment.tutor_data.name}</Text>
                    <Text style={styles.info}>Email................................{mockAppointment.tutor_data.email}</Text>
                    <Text style={styles.info}>Telefone.............................{mockAppointment.tutor_data.phone}</Text>
                </View>
                <View>
                    {/* Anamnese*/}
                    <Text style={styles.h2}>Anamnese</Text>
                    <Text style={styles.info}>Peso...........................................{mockAppointment.info_required.weight}</Text>
                    <Text style={styles.info}>Altura.........................................{mockAppointment.info_required.length}</Text>
                    <Text style={styles.info}>IMC..........................................{mockAppointment.info_required?.imc}</Text>
                    <Text style={styles.info}>Observações....................................Nenhuma</Text>
                    
                </View>
        </div>
      </Page>
    </Document>
  );
};

export default MyDocument;