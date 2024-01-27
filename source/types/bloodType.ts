export const DogBloodType = {
    DEA_1_1_Positive: 'DEA 1.1 Positive',
    DEA_1_1_Negative: 'DEA 1.1 Negative',
    DEA_1_2_Positive: 'DEA 1.2 Positive',
    DEA_1_2_Negative: 'DEA 1.2 Negative',
    DEA_1_3_Positive: 'DEA 1.3 Positive',
    DEA_1_3_Negative: 'DEA 1.3 Negative',
    DEA_3: 'DEA 3',
    DEA_4: 'DEA 4',
    DEA_5: 'DEA 5',
    DEA_7: 'DEA 7',
    UNKNOWN: 'Desconhecido',
} as const

export const CatBloodType = {
    A: 'A',
    B: 'B',
    AB: 'AB',
    UNKNOWN: 'Desconhecido',
} as const

export const HorseBloodType = {
    A: 'A',
    C: 'C',
    D: 'D',
    Q: 'Q',
    UNKNOWN: 'Desconhecido',
} as const

export const RabbitBloodType = {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    UNKNOWN: 'Desconhecido',
} as const

export const BirdBloodType = {
    A: 'A',
    B: 'B',
    SEM_TIPO_DEFINIDO: 'SEM TIPO DEFINIDO',
} as const

export const FishBloodType = {
    SEM_TIPO_DEFINIDO: 'SEM TIPO DEFINIDO',
} as const

export const ReptileBloodType = {
    SEM_TIPO_DEFINIDO: 'SEM TIPO DEFINIDO',
} as const

type DogBloodType = keyof typeof DogBloodType
type CatBloodType = keyof typeof CatBloodType
type HorseBloodType = keyof typeof HorseBloodType
type RabbitBloodType = keyof typeof RabbitBloodType
type BirdBloodType = keyof typeof BirdBloodType
type FishBloodType = keyof typeof FishBloodType
type ReptileBloodType = keyof typeof ReptileBloodType

export type ObjectBloodType =
    | typeof DogBloodType
    | typeof CatBloodType
    | typeof HorseBloodType
    | typeof RabbitBloodType
    | typeof BirdBloodType
    | typeof FishBloodType
    | typeof ReptileBloodType

export type BloodType =
    | DogBloodType
    | CatBloodType
    | HorseBloodType
    | RabbitBloodType
    | BirdBloodType
    | FishBloodType
    | ReptileBloodType
    | 'UNKNOWN'
