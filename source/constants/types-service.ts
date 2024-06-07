export const types_service = [
    {
        label: 'Telemedicina',
        value: 'online',
    },
    {
        label: 'Clínica',
        value: 'clinic',
    },
    {
        label: 'Domiciliar',
        value: 'domiciliary',
    },
    {
        label: 'Emergencial',
        value: 'emergency',
    },
    {
        label: 'Hospitalar',
        value: 'hospital',
    },
    {
        label: 'Intensivo',
        value: 'intensive',
    },
    {
        label: 'Ambulatorial',
        value: 'ambulatory',
    },
]

export const list_service_type = [
    {
        label: 'Domésticos',
        value: 'domestic',
    },
    {
        label: 'Equinos',
        value: 'horses',
    },
    {
        label: 'Silvestres e Conservação',
        value: 'wild',
    },
    {
        label: 'Rurais',
        value: 'rural',
    },
    {
        label: 'Exóticos',
        value: 'exotic',
    },
    {
        label: 'Não Convencionais',
        value: 'unconventional',
    },
    {
        label: 'Aquáticos',
        value: 'aquatic',
    },
]

export const SpecialtyAnimals = {
    domestic: 'Animais Domésticos',
    horses: 'Animais Equinos',
    wild: 'Animais Selvagens',
    rural: 'Animais Rurais',
    exotic: 'Animais Exóticos',
    unconventional: 'Animais Não Convencionais',
    aquatic: 'Animais Aquáticos',
} as const
export type KeysSpecialtyAnimals = keyof typeof SpecialtyAnimals

export const Services = {
    online: 'Telemedicina',
    clinic: 'Consulta Clínica',
    domiciliary: 'Consulta Domiciliar',
    emergency: 'Consulta Emergencial',
    hospital: 'Consulta Hospitalar',
    intensive: 'Consulta Intensiva',
    ambulatory: 'Consulta Ambulatorial',
} as const
export type KeysServices = keyof typeof Services
