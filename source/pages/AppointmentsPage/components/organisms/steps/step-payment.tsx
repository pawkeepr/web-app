import { Form, useFormikContext } from "formik";
import { useState } from "react";
import { Input, Label } from "reactstrap";
import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import CardTutor from "~/Components/molecules/card-tutor";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import FieldNumber from "~/Components/molecules/field-number/field-number";
import { StepProps } from "~/types/helpers";
import { generatePDF } from "~/utils/pdf-generator/generatePDF";


const StepPayment = ({ activeTab, toggleTab }: StepProps) => {
    const { handleSubmit, isSubmitting } = useFormikContext();
    
    const mockAppointment = {
        id: 'd5babb48-dd33-48e5-8a54-46103beaf5ae',
        pet_data: {
          name_pet: 'rave',
          microchip: null,
          identification_number: null,
          specie: 'dog',
          race: 'Vira-Lata',
          blood_type: 'DEA_1.1_Positive',
          blood_donator: null,
          organ_donor: '',
          sex: 'female',
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
            age: null,
            height: null,
            length: null,
            weight: null,
            type_weight: null,
            imc: null,
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

    const [event, setEvent] = useState<string>('credit');

    const options = new Array(12).fill(0).map((item, index) => ({
        value: index + 1,
        label: `${index + 1} Parcela${index + 1 > 1 ? 's' : ''}`,
        color: 'rgb(255 200 107);',
    }));

    return (
        <Form className="card card-body shadow-lg" onSubmit={handleSubmit}>
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Informações de Pagamento
                <br />
            </h4>
            <CardTutor />
            <div className="grid grid-cols-2 gap-2">
                <div className="my-3 justify-center items-center flex mobile:flex-col mobile:items-start col-span-full">
                    <div className="form-check form-check-inline">
                        <Input
                            id="credit"
                            name="payments.form_payment"
                            type="radio"
                            className="form-check-input"
                            defaultChecked
                            onChange={(e) => { setEvent('credit') }}
                            required
                        />
                        <Label className="form-check-label" htmlFor="credit">
                            Cartão de Crédito
                        </Label>
                    </div>
                    <div className="form-check form-check-inline">
                        <Input
                            id="debit"
                            name="payments.form_payment"
                            type="radio"
                            onChange={(e) => { setEvent('debit') }}
                            className="form-check-input"
                            required
                        />
                        <Label className="form-check-label" htmlFor="debit">
                            Cartão de Débito
                        </Label>
                    </div>
                    <div className="form-check form-check-inline">
                        <Input
                            id="pix"
                            name="payments.form_payment"
                            onChange={(e) => { setEvent('pix') }}
                            type="radio"
                            className="form-check-input"
                            required
                        />
                        <Label className="form-check-label" htmlFor="pix">
                            Pix
                        </Label>
                    </div>
                    <div className="form-check form-check-inline">
                        <Input
                            id="cash"
                            name="payments.form_payment"
                            onChange={(e) => { setEvent('cash') }}
                            type="radio"
                            className="form-check-input"
                            required
                        />
                        <Label className="form-check-label" htmlFor="cash">
                            Dinheiro
                        </Label>
                    </div>
                </div>

                <FieldControlSelect
                    label="Quantidade de Parcelas"
                    placeholder="Selecione a quantidade de parcelas"
                    name="payments.number_installments"
                    options={options}
                    isDisabled={event !== 'credit'}
                />
                <FieldNumber
                    label="Valor do Pagamento? (R$)"
                    name="payments.value_payment"
                />
            </div>

            <div className="flex items-center justify-center gap-3 mt-4">
                <BtnCancel
                    label="Voltar"
                    condition={!isSubmitting}
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                />
                <BtnPrimary
                    isLoading={isSubmitting}
                    type="submit"
                    label="Concluir Consulta"
                />
            </div>
            <BtnPrimary
                    // isLoading={isSubmitting}
                    onClick={() => {generatePDF(mockAppointment)}}
                    // type="submit"
                    label="Gerar pdf"
                />

        </Form>
    );
};

export default StepPayment;