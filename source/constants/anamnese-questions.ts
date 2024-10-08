export const QuestionTypes = {
    digestive_sys: 'digestive_sys',
    respiratory_sys: 'respiratory_sys',
    urinary_sys: 'urinary_sys',
    nervous_sys: 'nervous_sys',
    locomotive_sys: 'locomotive_sys',
    others: 'others',
    general_information: 'general_information',
    lymphatic_sys: 'lymphatic_sys',
    // player_sys: 'player_sys',
    visual_sys: 'visual_sys',
    reproductive_sys: 'reproductive_sys',
} as const
export type KeyOfQuestionTypes = keyof typeof QuestionTypes

export const TKeysOfQuestionTypes = {
    digestive_sys: 'Sistema Digestivo',
    respiratory_sys: 'Sistema Respiratório',
    urinary_sys: 'Sistema Urinário',
    nervous_sys: 'Sistema Nervoso',
    locomotive_sys: 'Sistema Locomotor',
    others: 'Outros',
    general_information: 'Informações Gerais',
    lymphatic_sys: 'Sistema Linfático',
    // player_sys: 'player_sys',
    visual_sys: 'Sistema Visual',
    reproductive_sys: 'Sistema Reprodutor',
} as const

export type Question = {
    id: number
    question: string
    type: keyof typeof QuestionTypes
}

export const questions: Question[] = [
    {
        id: 1,
        question: 'O Animal está se alimentando normalmente?',
        type: 'digestive_sys',
    },
    {
        id: 2,
        question: 'O Animal está bebendo água normalmente?',
        type: 'digestive_sys',
    },
    {
        id: 3,
        question: 'O Animal está defecando normalmente?',
        type: 'digestive_sys',
    },
    {
        id: 4,
        question: 'O Animal está vomitando?',
        type: 'digestive_sys',
    },
    {
        id: 5,
        question: 'O Animal apresenta secreção nasal ou ocular?',
        type: 'respiratory_sys',
    },
    {
        id: 6,
        question: 'O Animal apresenta tosse?',
        type: 'respiratory_sys',
    },
    {
        id: 7,
        question: 'O Animal apresenta espirros frequentes?',
        type: 'respiratory_sys',
    },
    {
        id: 8,
        question: 'O Animal apresenta dificuldade para respirar?',
        type: 'respiratory_sys',
    },
    {
        id: 9,
        question: 'O Animal apresenta dificuldade para urinar?',
        type: 'urinary_sys',
    },
    {
        id: 10,
        question: 'O Animal apresenta sangue na urina?',
        type: 'urinary_sys',
    },
    {
        id: 11,
        question: 'O Animal apresenta convulsões?',
        type: 'nervous_sys',
    },
    {
        id: 12,
        question: 'O Animal apresenta alterações de comportamento e/ou hábitos?',
        type: 'nervous_sys',
    },
    {
        id: 13,
        question: 'O Animal apresenta dificuldade visual ou auditiva?',
        type: 'nervous_sys',
    },
    {
        id: 14,
        question: 'O Animal apresenta alguma alteração na sua movimentação?',
        type: 'nervous_sys',
    },
    {
        id: 15,
        question: 'O Animal apresenta dificuldade para andar?',
        type: 'locomotive_sys',
    },
    {
        id: 16,
        question: 'O Animal apresenta dor ao toque?',
        type: 'locomotive_sys',
    },
    {
        id: 17,
        question: 'O Animal apresenta dificuldade para se levantar?',
        type: 'locomotive_sys',
    },
    {
        id: 19,
        question: 'Ocorreu algum tipo de trauma?',
        type: 'locomotive_sys',
    },
    {
        id: 20,
        question: 'O Animal pratica alguma atividade física?',
        type: 'locomotive_sys',
    },
]
