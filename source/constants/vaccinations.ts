import { Species } from '~/types/speciesType'

type Vaccination = {
    name: string
    protection_against: string[]
    initial_schedule: string
    first_dose: string
    second_dose: string
    third_dose?: string
    fourth_dose?: string
    n_th_dose?: string
    annual_revaccination: boolean
    immunization_protocol: string[]
}

const vaccinations_dogs: Vaccination[] = [
    {
        name: 'V8 ou V10 (Múltipla Canina)',
        protection_against: [
            'Cinomose',
            'Hepatite Infecciosa Canina',
            'Adenovírus Tipo 2',
            'Parvovirose',
            'Parainfluenza',
            'Leptospirose (2 cepas na V8, múltiplas cepas na V10)',
        ],
        initial_schedule:
            '3 doses com intervalo de 21 a 28 dias entre elas (vacina injetável).',
        first_dose: 'A partir de 6 a 8 semanas de idade',
        second_dose: '3 a 4 semanas após a primeira dose',
        third_dose: '3 a 4 semanas após a segunda dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Múltipla 6 semanas (42 dias)',
            'Múltipla 9 semanas (63 dias)',
            'Múltipla 12 semanas (84 dias)',
            'Múltipla Anual (365 dias)',
        ],
    },
    {
        name: 'Antirrábica',
        protection_against: ['Raiva'],
        initial_schedule: 'Dose única (vacina injetável).',
        first_dose: 'A partir de 12 semanas de idade',
        second_dose: '',
        annual_revaccination: true,
        immunization_protocol: [
            'Raiva 12 semanas (84 dias)',
            'Raiva Anual (365 dias)',
        ],
    },
    {
        name: 'Gripe Canina (Tosse dos Canis)',
        protection_against: [
            'Bordetella bronchiseptica',
            'Vírus da Parainfluenza Canina',
        ],
        initial_schedule:
            '2 doses com intervalo de 21 dias entre elas (vacina injetável).',
        first_dose: 'A partir de 8 semanas de idade',
        second_dose: '3 a 4 semanas após a primeira dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Gripe Canina 8 semanas (56 dias)',
            'Gripe Canina 11 semanas (77 dias)',
            'Gripe Canina Anual (365 dias)',
        ],
    },
    {
        name: 'Giárdia',
        protection_against: ['Giardia spp.'],
        initial_schedule:
            '2 doses com intervalo de 21 dias entre elas (vacina injetável).',
        first_dose: 'A partir de 8 semanas de idade',
        second_dose: '3 a 4 semanas após a primeira dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Giárdia 8 semanas (56 dias)',
            'Giárdia 11 semanas (77 dias)',
            'Giárdia Anual (365 dias)',
        ],
    },
]
const vaccinations_cats: Vaccination[] = [
    {
        name: 'TRÍPLICE FELINA',
        protection_against: [
            'Panleucopenia Felina',
            'Feline Viral Rhinotracheitis',
            'Feline Calicivirus',
        ],
        initial_schedule:
            '2 doses with a 21-day interval between them (injectable vaccine).',
        first_dose: 'Starting at 9 weeks of age',
        second_dose: '3 to 4 weeks after the first dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Multiple 9 weeks (63 days)',
            'Multiple 12 weeks (84 days)',
            'Multiple/Rabies 16 weeks (112 days)',
            'Multiple/Rabies Annual (365 days)',
        ],
    },
    {
        name: 'QUÁDRUPLA FELINA',
        protection_against: [
            'Panleucopenia Felina',
            'Feline Viral Rhinotracheitis',
            'Feline Calicivirus',
            'Feline Chlamydia Psittaci',
        ],
        initial_schedule:
            '2 doses with a 21-day interval between them (injectable vaccine).',
        first_dose: 'Starting at 9 weeks of age',
        second_dose: '3 to 4 weeks after the first dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Multiple 9 weeks (63 days)',
            'Multiple 12 weeks (84 days)',
            'Multiple/Rabies 16 weeks (112 days)',
            'Multiple/Rabies Annual (365 days)',
        ],
    },
    {
        name: 'QUÍNTUPLA FELINA',
        protection_against: [
            'Panleucopenia Felina',
            'Feline Viral Rhinotracheitis',
            'Feline Calicivirus',
            'Feline Chlamydia Psittaci',
            'Feline Leukemia Virus',
        ],
        initial_schedule:
            '2 doses with a 21-day interval between them (injectable vaccine).',
        first_dose: 'Starting at 8 weeks of age',
        second_dose: '3 to 4 weeks after the first dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Multiple 8 weeks (56 days)',
            'Multiple 11 weeks (77 days)',
            'Multiple/Rabies 14 weeks (98 days)',
            'Multiple/Rabies Annual (365 days)',
        ],
    },
    {
        name: 'Raiva Felina',
        protection_against: ['Rabies'],
        initial_schedule: 'Single dose (injectable vaccine).',
        first_dose: 'Single dose starting at 12 weeks of age',
        second_dose: '',
        annual_revaccination: true,
        immunization_protocol: [
            'Rabies 12 weeks (84 days)',
            'Rabies Annual (365 days)',
        ],
    },
]

const vaccinations_equines: Vaccination[] = [
    {
        name: 'Vacina contra Tétano',
        protection_against: ['Tétano'],
        initial_schedule:
            '2 doses com intervalo de 3 a 4 semanas entre elas (vacina injetável).',
        first_dose: 'A partir de 3 a 4 meses de idade',
        second_dose: '3 a 4 semanas após a primeira dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Tétano 3 meses (90 dias)',
            'Tétano 4 meses (120 dias)',
            'Tétano Anual (365 dias)',
        ],
    },
    {
        name: 'Vacina contra Influenza Equina',
        protection_against: ['Influenza Equina'],
        initial_schedule:
            '3 doses com intervalo de 3 a 4 semanas entre elas (vacina injetável).',
        first_dose: 'A partir de 6 meses de idade',
        second_dose: '3 a 4 semanas após a primeira dose',
        third_dose: '3 a 4 semanas após a segunda dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Influenza 6 meses (180 dias)',
            'Influenza 7 meses (210 dias)',
            'Influenza 8 meses (240 dias)',
            'Influenza Semestral (180 dias)',
        ],
    },
    {
        name: 'Vacina contra Encefalomielite Equina (Leste e Oeste)',
        protection_against: [
            'Encefalomielite Equina do Leste (EEE)',
            'Encefalomielite Equina do Oeste (WEE)',
        ],
        initial_schedule:
            '2 doses com intervalo de 3 a 4 semanas entre elas (vacina injetável).',
        first_dose: 'A partir de 4 a 6 meses de idade',
        second_dose: '3 a 4 semanas após a primeira dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Encefalomielite 4 meses (120 dias)',
            'Encefalomielite 6 meses (180 dias)',
            'Encefalomielite Anual (365 dias)',
        ],
    },
    {
        name: 'Vacina contra Rinopneumonite Equina (EHV-1 e EHV-4)',
        protection_against: [
            'Herpesvírus Equino 1 (EHV-1)',
            'Herpesvírus Equino 4 (EHV-4)',
        ],
        initial_schedule:
            '3 doses com intervalo de 3 a 4 semanas entre elas (vacina injetável).',
        first_dose: 'A partir de 6 meses de idade',
        second_dose: '3 a 4 semanas após a primeira dose',
        third_dose: '3 a 4 semanas após a segunda dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Rinopneumonite 6 meses (180 dias)',
            'Rinopneumonite 7 meses (210 dias)',
            'Rinopneumonite 8 meses (240 dias)',
            'Rinopneumonite Semestral (180 dias)',
        ],
    },
    {
        name: 'Vacina contra Raiva',
        protection_against: ['Raiva'],
        initial_schedule: 'Dose única (vacina injetável).',
        first_dose: 'A partir de 6 meses de idade',
        second_dose: '',
        annual_revaccination: true,
        immunization_protocol: [
            'Raiva 6 meses (180 dias)',
            'Raiva Anual (365 dias)',
        ],
    },
]

const vaccinations_caprine: Vaccination[] = [
    {
        name: 'Vacina contra Carbúnculo Sintomático e Gangrena Gasosa',
        protection_against: ['Carbúnculo Sintomático', 'Gangrena Gasosa'],
        initial_schedule:
            '2 doses com intervalo de 4 a 6 semanas entre elas (vacina injetável).',
        first_dose: 'A partir de 3 meses de idade',
        second_dose: '4 a 6 semanas após a primeira dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Carbúnculo e Gangrena 3 meses (90 dias)',
            'Carbúnculo e Gangrena 4 meses (120 dias)',
            'Carbúnculo e Gangrena Anual (365 dias)',
        ],
    },
    {
        name: 'Vacina contra Clostridioses (Polivalente)',
        protection_against: [
            'Tétano',
            'Gangrena Gasosa',
            'Enterotoxemia',
            'Hepatite Necrótica',
        ],
        initial_schedule:
            '2 doses com intervalo de 4 a 6 semanas entre elas (vacina injetável).',
        first_dose: 'A partir de 3 meses de idade',
        second_dose: '4 a 6 semanas após a primeira dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Clostridioses 3 meses (90 dias)',
            'Clostridioses 4 meses (120 dias)',
            'Clostridioses Anual (365 dias)',
        ],
    },
    {
        name: 'Vacina contra Ectima Contagioso',
        protection_against: ['Ectima Contagioso'],
        initial_schedule: 'Dose única (vacina injetável ou intradérmica).',
        first_dose: 'A partir de 1 mês de idade',
        second_dose: '',
        annual_revaccination: true,
        immunization_protocol: [
            'Ectima Contagioso 1 mês (30 dias)',
            'Ectima Contagioso Anual (365 dias)',
        ],
    },
    {
        name: 'Vacina contra Raiva',
        protection_against: ['Raiva'],
        initial_schedule: 'Dose única (vacina injetável).',
        first_dose: 'A partir de 3 meses de idade',
        second_dose: '',
        annual_revaccination: true,
        immunization_protocol: [
            'Raiva 3 meses (90 dias)',
            'Raiva Anual (365 dias)',
        ],
    },
    {
        name: 'Vacina contra Febre Aftosa',
        protection_against: ['Febre Aftosa'],
        initial_schedule:
            '2 doses com intervalo de 4 a 6 semanas entre elas (vacina injetável).',
        first_dose: 'A partir de 4 meses de idade',
        second_dose: '4 a 6 semanas após a primeira dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Febre Aftosa 4 meses (120 dias)',
            'Febre Aftosa 5 meses (150 dias)',
            'Febre Aftosa Semestral (180 dias)',
        ],
    },
    {
        name: 'Vacina contra Brucelose',
        protection_against: ['Brucelose'],
        initial_schedule: 'Dose única (vacina injetável).',
        first_dose: 'A partir de 3 a 8 meses de idade (somente fêmeas)',
        second_dose: '',
        annual_revaccination: false,
        immunization_protocol: ['Brucelose 3 a 8 meses (90 a 240 dias)'],
    },
]

const vaccinations_bovines: Vaccination[] = [
    {
        name: 'Vacina contra Febre Aftosa',
        protection_against: ['Febre Aftosa'],
        initial_schedule:
            '2 doses com intervalo de 4 a 6 semanas entre elas (vacina injetável).',
        first_dose: 'A partir de 4 meses de idade',
        second_dose: '4 a 6 semanas após a primeira dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Febre Aftosa 4 meses (120 dias)',
            'Febre Aftosa 5 meses (150 dias)',
            'Febre Aftosa Semestral (180 dias)',
        ],
    },
    {
        name: 'Vacina contra Carbúnculo Sintomático (Manqueira)',
        protection_against: ['Carbúnculo Sintomático'],
        initial_schedule:
            '2 doses com intervalo de 4 semanas entre elas (vacina injetável).',
        first_dose: 'A partir de 3 meses de idade',
        second_dose: '4 semanas após a primeira dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Carbúnculo Sintomático 3 meses (90 dias)',
            'Carbúnculo Sintomático 4 meses (120 dias)',
            'Carbúnculo Sintomático Anual (365 dias)',
        ],
    },
    {
        name: 'Vacina contra Clostridioses (Polivalente)',
        protection_against: [
            'Tétano',
            'Gangrena Gasosa',
            'Enterotoxemia',
            'Hepatite Necrótica',
        ],
        initial_schedule:
            '2 doses com intervalo de 4 a 6 semanas entre elas (vacina injetável).',
        first_dose: 'A partir de 3 meses de idade',
        second_dose: '4 a 6 semanas após a primeira dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Clostridioses 3 meses (90 dias)',
            'Clostridioses 4 meses (120 dias)',
            'Clostridioses Anual (365 dias)',
        ],
    },
    {
        name: 'Vacina contra Brucelose',
        protection_against: ['Brucelose'],
        initial_schedule: 'Dose única (vacina injetável).',
        first_dose: 'A partir de 3 a 8 meses de idade (somente fêmeas)',
        second_dose: '',
        annual_revaccination: false,
        immunization_protocol: ['Brucelose 3 a 8 meses (90 a 240 dias)'],
    },
    {
        name: 'Vacina contra Leptospirose',
        protection_against: ['Leptospirose'],
        initial_schedule:
            '2 doses com intervalo de 4 a 6 semanas entre elas (vacina injetável).',
        first_dose: 'A partir de 3 meses de idade',
        second_dose: '4 a 6 semanas após a primeira dose',
        annual_revaccination: true,
        immunization_protocol: [
            'Leptospirose 3 meses (90 dias)',
            'Leptospirose 4 meses (120 dias)',
            'Leptospirose Anual (365 dias)',
        ],
    },
    {
        name: 'Vacina contra Raiva',
        protection_against: ['Raiva'],
        initial_schedule: 'Dose única (vacina injetável).',
        first_dose: 'A partir de 3 meses de idade',
        second_dose: '',
        annual_revaccination: true,
        immunization_protocol: [
            'Raiva 3 meses (90 dias)',
            'Raiva Anual (365 dias)',
        ],
    },
]

export const VaccinationsItems: {
    [key in Species]: Vaccination[]
} = {
    [Species.dog]: vaccinations_dogs,
    [Species.cat]: vaccinations_cats,
    [Species.rabbit]: [],
    [Species.fish]: [],
    [Species.bird]: [],
    [Species.chicken]: [],
    [Species.equine]: vaccinations_equines,
    [Species.bovine]: vaccinations_bovines,
    [Species.chelonians]: [],
    [Species.serpent]: [],
    [Species.lizard]: [],
    [Species.pig]: [],
    [Species.caprine]: vaccinations_caprine,
    [Species.rodent]: [],
    [Species.unknown]: [],
}
