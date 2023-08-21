import Row from "react-bootstrap/Row";
//Import images

import { StepProps } from "./types";

import AnswerRadio from "~/Components/molecules/answer-radio";

import { useFormikContext } from "formik";
import { BtnLabel, BtnPrimary } from "~/Components/atoms/btn";
import {
    questions_digestive_system,
    questions_locomotive_system,
    questions_nervous_system,
    questions_respiratory_system,
    questions_urinary_system,
} from "~/constants/anamnese-questions";
import { InitialValues } from "~/pages/AppointmentsPage/Appointments";
import ControlSwitch from "../../molecules/switch/switch";


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

                    <ControlSwitch
                        label="Sistema Digestivo"
                        className="mt-2 lg:w-16 lg:h-7 w-[3.72rem] h-6"
                    >
                        <AnswerRadio
                            answers={questions_digestive_system.map((question) => ({
                                ...question,
                                name: `anamnese.${question.question}`,
                            }))}
                        />
                    </ControlSwitch>
                    <ControlSwitch
                        label="Sistema Respiratório"
                        className="mt-2 lg:w-16 lg:h-7 w-[3.72rem] h-6"
                    >
                        <AnswerRadio
                            answers={questions_respiratory_system.map(
                                (question) => ({
                                    ...question,
                                    name: `anamnese.${question.question}`,
                                })
                            )}
                        />
                    </ControlSwitch>
                    <ControlSwitch
                        label="Sistema Locomotor"
                        className="mt-2 lg:w-16 lg:h-7 w-[3.72rem] h-6"
                    >
                        <AnswerRadio
                            answers={questions_locomotive_system.map(
                                (question) => ({
                                    ...question,
                                    name: `anamnese.${question.question}`,
                                })
                            )}
                        />
                    </ControlSwitch>
                    <ControlSwitch
                        label="Sistema Urinário"
                        className="mt-2 lg:w-16 lg:h-7 w-[3.72rem] h-6"
                    >
                        <AnswerRadio
                            answers={questions_urinary_system.map((question) => ({
                                ...question,
                                name: `anamnese.${question.question}`,
                            }))}
                        />
                    </ControlSwitch>
                    <ControlSwitch
                        label="Sistema Nervoso"
                        className="mt-2 lg:w-16 lg:h-7 w-[3.72rem] h-6"
                    >
                        <AnswerRadio
                            answers={questions_nervous_system.map((question) => ({
                                ...question,
                                name: `anamnese.${question.question}`,
                            }))}
                        />
                    </ControlSwitch>
                </Row>
            </div>

            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnLabel
                    link
                    type="button"
                    className="right previestab"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                >
                    <i className="ri-arrow-left-line align-middle fs-16 me-2"></i>{" "}
                    Voltar
                </BtnLabel>
                <BtnPrimary
                    type="button"
                    className="btn-label "
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    <span className="ml-1"> Próximo </span>
                    <i className="ri-arrow-right-line  align-middle fs-16 p-1"></i>
                </BtnPrimary>
            </div>
        </>
    );
};

export default StepAnamnese;