import Row from 'react-bootstrap/Row';
//Import images

import { StepProps } from './types';

import { BtnAvatar } from '~/Components/atoms/btn';
import AnswerRadio from '~/Components/molecules/answer-radio';

import {
    questions_digestive_system,
    questions_locomotive_system,
    questions_nervous_system,
    questions_respiratory_system,
    questions_urinary_system,
} from '~/constants/anamnese-questions';

const StepAnamnese = ({ toggleTab, activeTab }: StepProps) => {
    return (
        <>
            <div>
                <h5>Anamnese</h5>

            </div>

            <div>

                <Row className="g-3">

                    <BtnAvatar alt='Avatar de Tutor' name="pet.avatar" disabled />

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
                <button
                    type="button"
                    className="btn btn-success btn-label right ms-auto nexttab"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                    Próximo
                </button>
            </div>
        </>
    )
}

export default StepAnamnese