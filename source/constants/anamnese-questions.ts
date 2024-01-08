export type Question = {
    question: string;
    type: string;
};

export const questions_digestive_system: Question[] = [
    {
        question: 'O Animal está se alimentando normalmente?',
        type: 'digestive_system',
    },
    {
        question: 'O Animal está bebendo água normalmente?',
        type: 'digestive_system',
    },
    {
        question: 'O Animal está defecando normalmente?',
        type: 'digestive_system',
    },
    {
        question: 'O Animal está vomitando?',
        type: 'digestive_system',
    },
];

export const questions_respiratory_system: Question[] = [
    {
        question: 'O Animal apresenta secreção nasal ou ocular?',
        type: 'questions_respiratory',
    },
    {
        question: 'O Animal apresenta tosse?',
        type: 'questions_respiratory',
    },
    {
        question: 'O Animal apresenta espirros frequentes?',
        type: 'questions_respiratory',
    },
    {
        question: 'O Animal apresenta dificuldade para respirar?',
        type: 'questions_respiratory',
    },
];

export const questions_urinary_system: Question[] = [
    {
        question: 'O Animal apresenta dificuldade para urinar?',
        type: 'questions_urinary',
    },
    {
        question: 'O Animal apresenta sangue na urina?',
        type: 'questions_urinary',
    },
];

export const questions_nervous_system: Question[] = [
    {
        question: 'O Animal apresenta convulsões?',
        type: 'questions_nervous',
    },
    {
        question:
            'O Animal apresenta alterações de comportamento e/ou hábitos?',
        type: 'questions_nervous',
    },
    {
        question: 'O Animal apresenta dificuldade visual ou auditiva?',
        type: 'questions_nervous',
    },
    {
        question: 'O Animal apresenta alguma alteração na sua movimentação?',
        type: 'questions_nervous',
    },
];

export const questions_locomotive_system: Question[] = [
    {
        question: 'O Animal apresenta dificuldade para andar?',
        type: 'questions_locomotive',
    },
    {
        question: 'O Animal apresenta dor ao toque?',
        type: 'questions_locomotive',
    },
    {
        question: 'O Animal apresenta dificuldade para se levantar?',
        type: 'questions_locomotive',
    },
    {
        question: 'Apresenta alguma deformidade na região da coluna?',
        type: 'questions_locomotive',
    },
    {
        question: 'Ocorreu algum tipo de trauma?',
        type: 'questions_locomotive',
    },
];

export const questions_physical_activity = [
    {
        question: 'O Animal pratica alguma atividade física?',
        name: 'physical_activity',
    },
];
