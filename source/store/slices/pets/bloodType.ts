export const DogBloodType = {
    DEA_1_1_Positive: 'DEA_1.1_Positive',
    DEA_1_1_Negative: 'DEA_1.1_Negative',
    DEA_1_2_Positive: 'DEA_1.2_Positive',
    DEA_1_2_Negative: 'DEA_1.2_Negative',
    DEA_1_3_Positive: 'DEA_1.3_Positive',
    DEA_1_3_Negative: 'DEA_1.3_Negative',
    DEA_3: 'DEA_3',
    DEA_4: 'DEA_4',
    DEA_5: 'DEA_5',
    DEA_7: 'DEA_7',
    UNKNOWN: 'unknown',
} as const;

export const CatBloodType = {
    A: 'A',
    B: 'B',
    AB: 'AB',
} as const;

export const HorseBloodType = {
    A: 'A',
    C: 'C',
    D: 'D',
    Q: 'Q',
} as const;

export const RabbitBloodType = {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
} as const;

export const BirdBloodType = {
    A: 'A',
    B: 'B',
    SEM_TIPO_DEFINIDO: 'SEM_TIPO_DEFINIDO',
} as const;

export const FishBloodType = {
    SEM_TIPO_DEFINIDO: 'SEM_TIPO_DEFINIDO',
} as const;

export const ReptileBloodType = {
    SEM_TIPO_DEFINIDO: 'SEM_TIPO_DEFINIDO',
} as const;

type DogBloodType = keyof typeof DogBloodType;
type CatBloodType = keyof typeof CatBloodType;
type HorseBloodType = keyof typeof HorseBloodType;
type RabbitBloodType = keyof typeof RabbitBloodType;
type BirdBloodType = keyof typeof BirdBloodType;
type FishBloodType = keyof typeof FishBloodType;
type ReptileBloodType = keyof typeof ReptileBloodType;

export type BloodType = DogBloodType | CatBloodType | HorseBloodType | RabbitBloodType | BirdBloodType | FishBloodType | ReptileBloodType | 'unknown';
