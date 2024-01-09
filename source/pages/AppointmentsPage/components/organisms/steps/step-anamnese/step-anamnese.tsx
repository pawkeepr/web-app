import { useEffect, useMemo } from 'react';
import { BtnPrimary } from '~/Components/atoms/btn';
import FieldArraySafe from '~/Components/molecules/field-array-safe';
import { OptionSelect } from '~/Components/molecules/field-control';
import FieldNumber from '~/Components/molecules/field-number';
import CardInputAnamnese from '~/Components/organism/card-input-anamnese';
import { questions } from '~/constants/anamnese-questions';
import useFormikContextSafe from '~/hooks/use-formik-context-safe';
import { StepProps, Tabs } from '~/types/helpers';
import {
    CtxStepAnamnese,
    schemaStepAnamneseValidation,
} from '../../../validations.yup';

const TranslationOptions = {
    yes: 'Sim',
    no: 'Não',
    other: 'Outro',
} as const;

// Função para calcular o IMC de um animal
// height: altura em centímetros
// weight: peso em quilos
function calcularIMC(height: number, weight: number): number {
    if (height === 0 || weight === 0) {
        return 0; // Evita divisão por zero
    }

    const heightInMeters = height / 100; // Converter altura para metros

    const imc = weight / (heightInMeters * heightInMeters); // Converter altura para metros
    return imc;
}

const StepAnamnese = ({ toggleTab, activeTab }: StepProps) => {
    const { values, setFieldValue, errors } =
        useFormikContextSafe<CtxStepAnamnese>();

    const height = useMemo(
        () => values.details_pet_consultation?.height,
        [values],
    );
    const weight = useMemo(
        () => values.details_pet_consultation?.weight,
        [values],
    );

    useEffect(() => {
        if (height && weight) {
            const imc = calcularIMC(Number(height), Number(weight));
            setFieldValue('details_pet_consultation.imc', imc);
        }
    }, [height, weight]);

    const isValid = useMemo(() => {
        return schemaStepAnamneseValidation.isValidSync(values);
    }, [values]);

    return (
        <section className="card card-body shadow-lg">
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Anamnese
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>

            <div className="grid grid-cols-3 gap-3">
                <FieldNumber
                    ctx={values}
                    label="Peso"
                    placeholder="Peso do pet em quilos, exemplo = 0.5 (500 gramas)"
                    required
                    name="details_pet_consultation.weight"
                />

                <FieldNumber
                    ctx={values}
                    label="Altura"
                    placeholder="Altura do pet em centímetros, exemplo = 32"
                    name="details_pet_consultation.height"
                />

                <FieldNumber
                    ctx={values}
                    label="Comprimento"
                    placeholder="Comprimento do pet em centímetros "
                    className="border-gray-300"
                    name="details_pet_consultation.length"
                />

                <div>
                    {values.details_pet_consultation?.imc > 0 && (
                        <h2 className="m-4 font-bold">
                            O IMC do animal é:{' '}
                            {values.details_pet_consultation?.imc?.toFixed(2)}
                        </h2>
                    )}
                </div>
            </div>

            <FieldArraySafe ctx={values} name="anamnesis.questions_anamnesis">
                {({ push, remove }) => (
                    <>
                        {values.anamnesis?.questions_anamnesis?.map(
                            (treatment, index) => (
                                <div
                                    key={`treatment-${index}`}
                                    className="w-full bg-secondary rounded-md text-xs py-1 px-2"
                                >
                                    <div className="w-full flex flex-row bg-secondary px-2 rounded-sm border-dashed border border-primary">
                                        <div className="grid grid-cols-6 w-full">
                                            <h6 className="col-span-2 font-mono font-semibold  capitalize">
                                                {treatment.name_anamnesis}
                                            </h6>
                                            <h6 className="col-span-1 font-mono font-semibold  capitalize">
                                                {
                                                    TranslationOptions[
                                                        treatment.options_anamnesis as keyof typeof TranslationOptions
                                                    ]
                                                }
                                            </h6>
                                            <h6 className="col-span-1 font-mono font-semibold  capitalize">
                                                {typeof treatment.type_anamnesis ===
                                                'string'
                                                    ? treatment.type_anamnesis
                                                    : treatment.type_anamnesis
                                                          ?.label}
                                            </h6>

                                            <p className="col-span-3 font-mono  capitalize">
                                                {treatment.notes_anamnesis}
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
                        <CardInputAnamnese
                            items={questions}
                            handleSubmit={async (data, formikHelpers) => {
                                const { label, type } =
                                    data.type_anamnesis as OptionSelect;

                                push({
                                    ...data,
                                    name_anamnesis: label,
                                    type_anamnesis: type,
                                });

                                formikHelpers.resetForm();
                            }}
                        />
                    </>
                )}
            </FieldArraySafe>

            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnPrimary
                    label="Próximo"
                    disabled={!isValid}
                    onClick={() => {
                        toggleTab((activeTab + 1) as Tabs);
                    }}
                />
            </div>
        </section>
    );
};

export default StepAnamnese;
