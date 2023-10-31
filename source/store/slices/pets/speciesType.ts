import {
    BirdBloodType,
    CatBloodType,
    DogBloodType,
    FishBloodType,
    HorseBloodType,
    RabbitBloodType,
    ReptileBloodType,
} from './bloodType';
import {
    BirdBreed,
    CatBreed,
    DogBreed,
    FishBreed,
    HorseBreed,
    RabbitBreed,
    ReptileBreed,
} from './breedType';

export enum Species {
    'dog' = 'Cachorro',
    'cat' = 'Gato',
    'horse' = 'Cavalo',
    'rabbit' = 'Coelho',
    'bird' = 'Pássaro',
    'fish' = 'Peixe',
    'reptile' = 'Réptil',
}

export type KeyOfSpecies = keyof typeof Species;

export enum Gender {
    male = 'Macho',
    female = 'Fêmea',
    unknown = 'Desconhecido',
}

export type KeyOfGender = keyof typeof Gender

export enum MapOptionSpecies {
    'dog' = 'dog',
    'cat' = 'cat',
    'horse' = 'horse',
    'rabbit' = 'rabbit',
    'bird' = 'bird',
    'fish' = 'fish',
    'reptile' = 'reptile',
    'Cachorro' = 'dog',
    'Gato' = 'cat',
    'Cavalo' = 'horse',
    'Coelho' = 'rabbit',
    'Pássaro' = 'bird',
    'Peixe' = 'fish',
    'Réptil' = 'reptile',
}

export type KeyOfMapOptionSpecies = keyof typeof MapOptionSpecies;

export const dog = {
    name: 'Cachorro',
    value: 'dog',
    bloodType: Object.values(DogBloodType).map((bloodType) => ({
        name: bloodType,
        value: bloodType,
    })),
    breedType: Object.values(DogBreed).map((breedType) => ({
        name: breedType,
        value: breedType,
    })),
}

export const cat = {
    name: 'Gato',
    value: 'cat',
    bloodType: Object.values(CatBloodType).map((bloodType) => ({
        name: bloodType,
        value: bloodType,
    })),
    breedType: Object.values(CatBreed).map((breedType) => ({
        name: breedType,
        value: breedType,
    })),
}

export const horse = {
    name: 'Cavalo',
    value: 'horse',
    bloodType: Object.values(HorseBloodType).map((bloodType) => ({
        name: bloodType,
        value: bloodType,
    })),
    breedType: Object.values(HorseBreed).map((breedType) => ({
        name: breedType,
        value: breedType,
    })),
}

export const rabbit = {
    name: 'Coelho',
    value: 'rabbit',
    bloodType: Object.values(RabbitBloodType).map((bloodType) => ({
        name: bloodType,
        value: bloodType,
    })),
    breedType: Object.values(RabbitBreed).map((breedType) => ({
        name: breedType,
        value: breedType,
    })),
}

export const bird = {
    name: 'Pássaro',
    value: 'bird',
    bloodType: Object.values(BirdBloodType).map((bloodType) => ({
        name: bloodType,
        value: bloodType,
    })),
    breedType: Object.values(BirdBreed).map((breedType) => ({
        name: breedType,
        value: breedType,
    })),
}

export const fish = {
    name: 'Peixe',
    value: 'fish',
    bloodType: Object.values(FishBloodType).map((bloodType) => ({
        name: bloodType,
        value: bloodType,
    })),
    breedType: Object.values(FishBreed).map((breedType) => ({
        name: breedType,
        value: breedType,
    })),
}

export const reptile = {
    name: 'Réptil',
    value: 'reptile',
    bloodType: Object.values(ReptileBloodType).map((bloodType) => ({
        name: bloodType,
        value: bloodType,
    })),
    breedType: Object.values(ReptileBreed).map((breedType) => ({
        name: breedType,
        value: breedType,
    })),
}

export type SpeciesType = typeof dog | typeof cat | typeof horse | typeof rabbit | typeof bird | typeof fish | typeof reptile;

export const species = [
    dog,
    cat,
    horse,
    rabbit,
    bird,
    fish,
    reptile,
];