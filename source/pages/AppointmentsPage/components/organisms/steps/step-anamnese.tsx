/* eslint-disable react/jsx-no-undef */
import Row from "react-bootstrap/Row";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";

import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import ControlSwitchDiv from "~/Components/molecules/control-switch-div";
import {
    questions_digestive_system,
    questions_locomotive_system,
    questions_nervous_system,
    questions_respiratory_system,
    questions_urinary_system,
} from "~/constants/anamnese-questions";
import { StepProps } from "~/types/helpers";
import AnswerSwitch from "../../molecules/answer-switch/answer-switch";

const physical_activity = ['Caminhadas', 'Corridas', 'Natação', 'Passeios', 'Cabo-de-guerra', 'Varetinhas', 'Bolinhas']

const options = physical_activity.map((item) => ({
    value: item,
    label: item,
    color: 'rgb(255 200 107);',
}));

const StepAnamnese = ({ toggleTab, activeTab }: StepProps) => {

    return (
        <div className="card card-body shadow-lg">
            <div>
                <h4 className="text-center font-sans font-semibold text-base capitalize">
                    Anamnese
                    <br />
                    <span className="text-xs font-bold text-secondary-500">Obrigatório (*)</span>
                </h4>
            </div>


            <div>
                <ControlSwitchDiv
                    label="O pet está praticando atividade física ?"
                    className="mt-3 w-[3.72rem] h-6 lg:w-16 lg:h-7"
                >
                    <FieldControlSelect
                        label="Selecione uma ou mais opções:"
                        placeholder="Selecione uma ou mais atividades"
                        isMulti
                        name="activities_carry"
                        options={options}
                    />
                </ControlSwitchDiv>

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
                        name='nervous_system'
                        answers={questions_nervous_system}
                    />

                    <AnswerSwitch
                        title="Sistema Locomotor"
                        name='locomotor_system'
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
        </div>
    );
};

export default StepAnamnese;