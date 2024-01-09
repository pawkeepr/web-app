import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn';

import { FieldArray, useFormikContext } from 'formik';
import { OptionSelect } from '~/Components/molecules/field-control';
import CardInputTreatment from '~/Components/organism/card-input-treatment';
import { VeterinaryConsultation } from '~/types/appointment';
import { StepProps, Tabs } from '~/types/helpers';

type CtxStepTreatment = Pick<VeterinaryConsultation, 'treatments'>;

const items: OptionSelect[] = [
    {
        value: 'activities_carry',
        label: 'Recomendações de atividades físicas',
    },
    {
        value: 'fast_test',
        label: 'Testes rápidos',
    },
    {
        value: 'medicine',
        label: 'Medicação',
    },
    {
        value: 'vaccine',
        label: 'Vacina',
    },
    {
        value: 'exam',
        label: 'Exame',
    },
    {
        value: 'nutrition',
        label: 'Nutrição Alimentar',
    },
];

const KeyTreatment = {
    activities_carry: 'Recomendações de atividades físicas',
    fast_test: 'Testes rápidos',
    medicine: 'Medicação',
    vaccine: 'Vacina',
    exam: 'Exame',
    nutrition: 'Nutrição Alimentar',
} as const;

const StepTreatment = ({ toggleTab, activeTab }: StepProps) => {
    const { values } = useFormikContext<CtxStepTreatment>();

    return (
        <section className="card card-body shadow-lg">
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Informações de Tratamento
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>
            <FieldArray name="treatments.questions_treatment">
                {({ push, remove }) => (
                    <>
                        {values.treatments?.questions_treatment?.map(
                            (treatment, index) => (
                                <div
                                    key={`treatment-${index}`}
                                    className="w-full bg-secondary rounded-md text-xs py-1 px-2"
                                >
                                    <div className="w-full flex flex-row bg-secondary px-2 rounded-sm border-dashed border border-primary">
                                        <div className="grid grid-cols-6 w-full">
                                            <h6 className="col-span-2 font-mono font-semibold  capitalize">
                                                {treatment.name_treatment}
                                            </h6>

                                            <h6 className="col-span-1 font-mono font-semibold  capitalize">
                                                {
                                                    KeyTreatment[
                                                        treatment.type_treatment as keyof typeof KeyTreatment
                                                    ]
                                                }
                                            </h6>

                                            <p className="col-span-3 font-mono  capitalize">
                                                {treatment.notes_treatment}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-red-500"
                                            onClick={() => remove(index)}
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            ),
                        )}
                        <CardInputTreatment
                            items={items}
                            handleSubmit={async (data, formikHelpers) => {
                                const { label, value } =
                                    data.type_treatment as OptionSelect;
                                push({
                                    ...data,
                                    type_treatment: value,
                                });
                                formikHelpers.resetForm();
                            }}
                        />
                    </>
                )}
            </FieldArray>

            <div className="flex items-center justify-center">
                <BtnCancel
                    type="button"
                    label="Voltar"
                    onClick={() => {
                        toggleTab((activeTab - 1) as Tabs);
                    }}
                />
                <BtnPrimary
                    type="button"
                    label="Próximo"
                    onClick={() => {
                        toggleTab((activeTab + 1) as Tabs);
                    }}
                />
            </div>
        </section>
    );
};

export default StepTreatment;
