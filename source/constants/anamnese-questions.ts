const QuestionTypes = {
    digestive_system: 'digestive_system',
    respiratory_system: 'respiratory_system',
    urinary_system: 'urinary_system',
    nervous_system: 'nervous_system',
    locomotive_system: 'locomotive_system',
    physical_activity: 'physical_activity',
    general_information: 'general_information',
} as const

export type KeyOfQuestionTypes = keyof typeof QuestionTypes

export type Question = {
    id: number
    question: string
    type: keyof typeof QuestionTypes
}

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
        type: 'respiratory_system',
    },
    {
        id: 6,
        question: 'O Animal apresenta tosse?',
        type: 'respiratory_system',
    },
    {
        id: 7,
        question: 'O Animal apresenta espirros frequentes?',
        type: 'respiratory_system',
    },
    {
        id: 8,
        question: 'O Animal apresenta dificuldade para respirar?',
        type: 'respiratory_system',
    },
    {
        id: 9,
        question: 'O Animal apresenta dificuldade para urinar?',
        type: 'urinary_system',
    },
    {
        id: 10,
        question: 'O Animal apresenta sangue na urina?',
        type: 'urinary_system',
    },
    {
        id: 11,
        question: 'O Animal apresenta convulsões?',
        type: 'nervous_system',
    },
    {
        id: 12,
        question: 'O Animal apresenta alterações de comportamento e/ou hábitos?',
        type: 'nervous_system',
    },
    {
        id: 13,
        question: 'O Animal apresenta dificuldade visual ou auditiva?',
        type: 'nervous_system',
    },
    {
        id: 14,
        question: 'O Animal apresenta alguma alteração na sua movimentação?',
        type: 'nervous_system',
    },
    {
        id: 15,
        question: 'O Animal apresenta dificuldade para andar?',
        type: 'locomotive_system',
    },
    {
        id: 16,
        question: 'O Animal apresenta dor ao toque?',
        type: 'locomotive_system',
    },
    {
        id: 17,
        question: 'O Animal apresenta dificuldade para se levantar?',
        type: 'locomotive_system',
    },
    {
        id: 18,
        question: 'Apresenta alguma deformidade na região da coluna?',
        type: 'locomotive_system',
    },
    {
        id: 19,
        question: 'Ocorreu algum tipo de trauma?',
        type: 'locomotive_system',
    },
    {
        id: 20,
        question: 'O Animal pratica alguma atividade física?',
        type: 'physical_activity',
    },
]
