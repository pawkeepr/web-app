/* eslint-disable react/jsx-no-undef */

import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import {
    questions_digestive_system,
    questions_locomotive_system,
    questions_nervous_system,
    questions_respiratory_system,
    questions_urinary_system,
} from "~/constants/anamnese-questions";
import { StepProps } from "~/types/helpers";
import AnswerSwitch from "../../molecules/answer-switch/answer-switch";


const StepAnamnese = ({ toggleTab, activeTab }: StepProps) => {

    return (
        <section className="card card-body shadow-lg">
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Anamnese
                <br />
                <span className="text-xs font-bold text-secondary-500">Obrigatório (*)</span>
            </h4>

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

            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnCancel
                    label="Voltar"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                />
                <BtnPrimary
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                />
            </div>
        </section>
    );
};

export default StepAnamnese;