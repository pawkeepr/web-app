/* eslint-disable react/jsx-no-undef */

import { useMemo, useState } from "react";
import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import ControlSwitchDiv from "~/Components/molecules/control-switch-div";
import FieldNumber from "~/Components/molecules/field-number";
import FieldTextArea from "~/Components/molecules/field-text-area";
import {
    questions_digestive_system,
    questions_locomotive_system,
    questions_nervous_system,
    questions_physical_activity,
    questions_respiratory_system,
    questions_urinary_system
} from "~/constants/anamnese-questions";
import { StepProps } from "~/types/helpers";
import AnswerSwitch from "../../molecules/answer-switch/answer-switch";
import * as yup from "yup";
import { useFormikContext } from "formik";
import { InitialValues } from "~/pages/NewPetPage";

const schema = yup.object().shape({
    weight: yup.number().max(100).required("Campo obrigatório"),
});


// Função para calcular o IMC de um animal
function calcularIMC(height: number, weight: number): number {
    if (height === 0 || weight === 0) {
        return 0; // Evita divisão por zero
    }
    const imc = weight / ((height / 100) * (height / 100)); // Converter altura para metros
    return imc;
}


const StepAnamnese = ({ toggleTab, activeTab }: StepProps) => {
    const [heightPet, setHeightPet] = useState(0);
    const [weightPet, setWeightPet] = useState(0);
    const { values } = useFormikContext<InitialValues>();


    const isValid = useMemo(() => {
        console.log(schema.isValidSync(values), values);
             
        return schema.isValidSync(values);
    },[values]);

    return (
        <section className="card card-body shadow-lg">
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Anamnese
                <br />
                <span className="text-xs font-bold text-secondary-500">Obrigatório (*)</span>
            </h4>

            <div className="grid grid-cols-3 gap-3">

                <FieldNumber
                    label="Peso"
                    placeholder="Peso do pet em quilos, exemplo = 0.5 (500 gramas)"
                    required
                    onChange={(e: any) => { setWeightPet(e.target.value) }}
                    name="weight"
                    type="number"
                />

                <FieldNumber
                    label="Altura"
                    placeholder="Altura do pet em centímetros, exemplo = 32"
                    onChange={(e: any) => { setHeightPet(e.target.value) }}
                    name="height"
                    type="number"
                />

                <FieldNumber
                    label="Comprimento"
                    placeholder="Comprimento do pet em centímetros "
                    className="border-gray-300"
                    name="length"
                    type="number"
                />

                <div>
                    {weightPet > 0 && heightPet > 0 && (
                        <h2
                            className="m-4 font-bold"
                        >
                            O IMC do animal é: {calcularIMC(heightPet, weightPet).toFixed(2)}
                        </h2>
                    )}
                </div>


            </div>

            <AnswerSwitch
                title="Atividade Física"
                name='physical_activity'
                answers={questions_physical_activity}
            />

            <AnswerSwitch
                title="Sistema Digestivo"
                name='digestive_system'
                answers={questions_digestive_system}
            />

            <AnswerSwitch
                title="Sistema Respiratório"
                name='respiratory_system'
                answers={questions_respiratory_system}
            />


            <AnswerSwitch
                title="Sistema Urinário"
                name='urinary_system'
                answers={questions_urinary_system}
            />

            <AnswerSwitch
                title="Sistema Nervoso"
                name='nervous_system'
                answers={questions_nervous_system}
            />

            <AnswerSwitch
                title="Sistema Locomotor"
                name='locomotor_system'
                answers={questions_locomotive_system}
            />

            <ControlSwitchDiv
                name="apply_disease"
                label="Doenças"
            >
                <FieldTextArea
                    label="Orientações e Anotações"
                    className="rounded-md w-full border-gray-300"
                    component="textarea"
                    name="exams"
                    type="text"
                />
            </ControlSwitchDiv>

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
                <BtnCancel
                    label="Voltar"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                />
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