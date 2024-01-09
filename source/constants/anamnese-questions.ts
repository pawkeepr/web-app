const QuestionTypes = {
    digestive_system: 'digestive_system',
    questions_respiratory: 'questions_respiratory',
    questions_urinary: 'questions_urinary',
    questions_nervous: 'questions_nervous',
    questions_locomotive: 'questions_locomotive',
    physical_activity: 'physical_activity',
} as const;

export type Question = {
    id: number;
    question: string;
    type: keyof typeof QuestionTypes;
};

export const questions: Question[] = [
    {
        id: 1,
        question: 'O Animal está se alimentando normalmente?',
        type: 'digestive_system',
    },
    {
        id: 2,
        question: 'O Animal está bebendo água normalmente?',
        type: 'digestive_system',
    },
    {
        id: 3,
        question: 'O Animal está defecando normalmente?',
        type: 'digestive_system',
    },
    {
        id: 4,
        question: 'O Animal está vomitando?',
        type: 'digestive_system',
    },
    {
        id: 5,
        question: 'O Animal apresenta secreção nasal ou ocular?',
        type: 'questions_respiratory',
    },
    {
        id: 6,
        question: 'O Animal apresenta tosse?',
        type: 'questions_respiratory',
    },
    {
        id: 7,
        question: 'O Animal apresenta espirros frequentes?',
        type: 'questions_respiratory',
    },
    {
        id: 8,
        question: 'O Animal apresenta dificuldade para respirar?',
        type: 'questions_respiratory',
    },
    {
        id: 9,
        question: 'O Animal apresenta dificuldade para urinar?',
        type: 'questions_urinary',
    },
    {
        id: 10,
        question: 'O Animal apresenta sangue na urina?',
        type: 'questions_urinary',
    },
    {
        id: 11,
        question: 'O Animal apresenta convulsões?',
        type: 'questions_nervous',
    },
    {
        id: 12,
        question:
            'O Animal apresenta alterações de comportamento e/ou hábitos?',
        type: 'questions_nervous',
    },
    {
        id: 13,
        question: 'O Animal apresenta dificuldade visual ou auditiva?',
        type: 'questions_nervous',
    },
    {
        id: 14,
        question: 'O Animal apresenta alguma alteração na sua movimentação?',
        type: 'questions_nervous',
    },
    {
        id: 15,
        question: 'O Animal apresenta dificuldade para andar?',
        type: 'questions_locomotive',
    },
    {
        id: 16,
        question: 'O Animal apresenta dor ao toque?',
        type: 'questions_locomotive',
    },
    {
        id: 17,
        question: 'O Animal apresenta dificuldade para se levantar?',
        type: 'questions_locomotive',
    },
    {
        id: 18,
        question: 'Apresenta alguma deformidade na região da coluna?',
        type: 'questions_locomotive',
    },
    {
        id: 19,
        question: 'Ocorreu algum tipo de trauma?',
        type: 'questions_locomotive',
    },
    {
        id: 20,
        question: 'O Animal pratica alguma atividade física?',
        type: 'physical_activity',
    },
];
