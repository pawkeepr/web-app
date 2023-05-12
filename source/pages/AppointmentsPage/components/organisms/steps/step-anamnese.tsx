import Row from 'react-bootstrap/Row';
//Import images

import { StepProps } from './types';

import AnswerRadio from '~/Components/molecules/answer-radio';

import { useFormikContext } from 'formik';
import { BtnSuccess } from '~/Components/atoms/btn';
import {
    questions_digestive_system,
    questions_locomotive_system,
    questions_nervous_system,
    questions_respiratory_system,
    questions_urinary_system,
} from '~/constants/anamnese-questions';
import { InitialValues } from '~/pages/AppointmentsPage/Appointments';
import AvatarPet from '../../atoms/pet-avatar';

const StepAnamnese = ({ toggleTab, activeTab }: StepProps) => {

    const { values } = useFormikContext<InitialValues>()

    return (
        <>
            <div>
                <h5>Anamnese</h5>

            </div>

            <div>

                <Row className="g-3">

                    <AvatarPet name={values.pet?.name || 'Pet'} />

                    <AnswerRadio
                        title="Sistema Digestivo"
                        answers={questions_digestive_system.map(question => ({
                            ...question,
                            name: `anamnese.${question.question}`
                        }))}
                    />

                    <AnswerRadio
                        title="Sistema Respiratório"
                        answers={questions_respiratory_system.map(question => ({
                            ...question,
                            name: `anamnese.${question.question}`
                        }))} />

                    <AnswerRadio
                        title="Sistema Locomotor"
                        answers={questions_locomotive_system.map(question => ({
                            ...question,
                            name: `anamnese.${question.question}`
                        }))}
                    />

                    <AnswerRadio
                        title="Sistema Urinário"
                        answers={questions_urinary_system.map(question => ({
                            ...question,
                            name: `anamnese.${question.question}`
                        }))}
                    />

                    <AnswerRadio
                        title="Sistema Nervoso"
                        answers={questions_nervous_system.map(question => ({
                            ...question,
                            name: `anamnese.${question.question}`
                        }))}
                    />
                </Row>
            </div>

            <div className="d-flex align-items-start gap-3 mt-4">
                <BtnSuccess
                    type="button"
                    className="btn-label right ms-auto nexttab"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    Continuar
                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                </BtnSuccess>
            </div>
        </>
    )
}

export default StepAnamnese