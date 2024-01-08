import { useEffect, useMemo } from 'react';
import * as yup from 'yup';
import { BtnPrimary } from '~/Components/atoms/btn';
import FieldNumber from '~/Components/molecules/field-number';
import FieldTextArea from '~/Components/molecules/field-text-area';
import useFormikContextSafe from '~/hooks/use-formik-context-safe';
import { VeterinaryConsultation } from '~/types/appointment';
import { StepProps } from '~/types/helpers';

type CtxStepAnamnese = Pick<
    VeterinaryConsultation,
    'anamnesis' | 'details_pet_consultation'
>;

const schema = yup.object().shape({
    weight: yup.number().max(100).required('Campo obrigatório'),
});

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
    const { values, setFieldValue } = useFormikContextSafe<CtxStepAnamnese>();

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
        return schema.isValidSync(values);
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
                    {values.details_pet_consultation?.imc && (
                        <h2 className="m-4 font-bold">
                            O IMC do animal é:{' '}
                            {values.details_pet_consultation?.imc?.toFixed(2)}
                        </h2>
                    )}
                </div>
            </div>

            <div className="flex justify-between flex-col items-start gap-2 mb-2">
                <span className="font-bold">Anotações Gerais</span>
                <FieldTextArea
                    label=""
                    className="rounded-md w-full border-gray-300"
                    component="textarea"
                    name="notes"
                    type="text"
                />
            </div>
            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnPrimary
                    label="Próximo"
                    disabled={!isValid}
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                />
            </div>
        </section>
    );
};

export default StepAnamnese;
