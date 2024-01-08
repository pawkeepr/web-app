import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn';

import { FieldArray, useFormikContext } from 'formik';
import CardInput from '~/Components/organism/card-input';
import { OptionSelect } from '~/store/slices/appointment-vet/types';
import { VeterinaryConsultation } from '~/types/appointment';
import { StepProps } from '~/types/helpers';

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
            <FieldArray name="treatments">
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
                                            <h6 className="col-span-1 font-mono font-semibold  capitalize">
                                                {
                                                    (
                                                        treatment.type_treatment as OptionSelect
                                                    ).label
                                                }
                                            </h6>
                                            <h6 className="col-span-2 font-mono font-semibold  capitalize">
                                                {treatment.name_treatment}
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
                        <CardInput
                            items={items}
                            handleSubmit={async (data, formikHelpers) => {
                                await new Promise((resolve) =>
                                    setTimeout(resolve, 300),
                                );
                                push(data);
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
                        toggleTab(activeTab - 1);
                    }}
                />
                <BtnPrimary
                    type="button"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                />
            </div>
        </section>
    );
};

export default StepTreatment;
