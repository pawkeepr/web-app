export type TreatmentItem = {
    value: string;
    label: string;
    color: string;
};

export const VACCINES: TreatmentItem[] = [
    {
        value: '1',
        label: 'Vacina',
        color: 'rgb(255 200 107);',
    },
];

export const MEDICINES: TreatmentItem[] = [
    {
        value: '1',
        label: 'Medicação',
        color: 'rgb(255 200 107);',
    },
];

export const EXAMS: TreatmentItem[] = [
    {
        value: '1',
        label: 'Exame',
        color: 'rgb(255 200 107);',
    },
];

export const DISEASES: TreatmentItem[] = [
    {
        value: '1',
        label: 'Doença',
        color: 'rgb(255 200 107);',
    },
];

export const NUTRITION: TreatmentItem[] = [
    {
        value: 'raçao',
        label: 'Raçao',
        color: 'rgb(255 200 107);',
    },
    {
        value: 'carne',
        label: 'Carne',
        color: 'rgb(255 200 107);',
    },
    {
        value: 'frango',
        label: 'Frango',
        color: 'rgb(255 200 107);',
    },
];

export const FAST_TESTS: TreatmentItem[] = [
    {
        value: '1',
        label: 'Teste rápido',
        color: 'rgb(255 200 107);',
    },
];
