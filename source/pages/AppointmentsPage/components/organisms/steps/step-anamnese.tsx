/* eslint-disable react/jsx-no-undef */
import Row from "react-bootstrap/Row";
//Import images

import { StepProps } from "./types";


import { useFormikContext } from "formik";
import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import {
    questions_digestive_system,
    questions_locomotive_system,
    questions_nervous_system,
    questions_respiratory_system,
    questions_urinary_system,
} from "~/constants/anamnese-questions";
import { InitialValues } from "~/pages/AppointmentsPage/Appointments";
import AnswerSwitch from "../../molecules/answer-switch/answer-switch";


const StepAnamnese = ({ toggleTab, activeTab }: StepProps) => {
    const { values } = useFormikContext<InitialValues>();

    return (
        <>
            <div>
                <h5 className="text-center">Anamnese</h5>
            </div>

            <div>
                <Row className="g-3">
                    {/* <AvatarPet name={values.pet?.name || 'Pet'} /> */}

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
                        name='urinary_system'
                        answers={questions_nervous_system}
                    />

                    <AnswerSwitch
                        title="Sistema Locomotor"
                        name='locomotive_system'
                        answers={questions_locomotive_system}
                    />
                </Row>
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
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                />
            </div>
        </>
    );
};

export default StepAnamnese;