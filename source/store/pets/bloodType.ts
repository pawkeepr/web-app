export enum DogBloodType {
    DEA_1_1_Positive = 'DEA_1.1_Positive',
    DEA_1_1_Negative = 'DEA_1.1_Negative',
    DEA_1_2_Positive = 'DEA_1.2_Positive',
    DEA_1_2_Negative = 'DEA_1.2_Negative',
    DEA_1_3_Positive = 'DEA_1.3_Positive',
    DEA_1_3_Negative = 'DEA_1.3_Negative',
    DEA_3 = 'DEA_3',
    DEA_4 = 'DEA_4',
    DEA_5 = 'DEA_5',
    DEA_7 = 'DEA_7',
}

export enum CatBloodType {
    A = 'A',
    B = 'B',
    AB = 'AB',
}

export enum HorseBloodType {
    A = 'A',
    C = 'C',
    D = 'D',
    Q = 'Q',
}

export enum RabbitBloodType {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
}

export enum BirdBloodType {
    A = 'A',
    B = 'B',
    SEM_TIPO_DEFINIDO = 'SEM_TIPO_DEFINIDO',
}

export enum FishBloodType {
    SEM_TIPO_DEFINIDO = 'SEM_TIPO_DEFINIDO',
}

export enum ReptileBloodType {
    SEM_TIPO_DEFINIDO = 'SEM_TIPO_DEFINIDO',
}


export type BloodType = DogBloodType | CatBloodType | HorseBloodType | RabbitBloodType | BirdBloodType | FishBloodType | ReptileBloodType;
