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

const vaccinations_dogs: Vaccination[] = []
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

export const VaccinationsItems: {
    [key in Species]: Vaccination[]
} = {
    [Species.dog]: [],
    [Species.cat]: vaccinations_cats,
    [Species.rabbit]: [],
    [Species.fish]: [],
    [Species.bird]: [],
    [Species.chicken]: [],
    [Species.equine]: [],
    [Species.bovine]: [],
    [Species.chelonians]: [],
    [Species.serpent]: [],
    [Species.lizard]: [],
    [Species.pig]: [],
    [Species.caprine]: [],
    [Species.rodent]: [],
    [Species.unknown]: [],
}
