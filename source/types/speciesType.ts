import {
    BirdBloodType,
    CatBloodType,
    DogBloodType,
    FishBloodType,
    HorseBloodType,
    RabbitBloodType,
    ReptileBloodType,
    type ObjectBloodType,
} from './bloodType'
import {
    BirdBreed,
    CatBreed,
    DogBreed,
    FishBreed,
    HorseBreed,
    RabbitBreed,
    ReptileBreed,
    type ObjectBreed,
} from './breedType'

export const Species = {
    dog: 'Cachorro',
    cat: 'Gato',
    horse: 'Cavalo',
    rabbit: 'Coelho',
    bird: 'Pássaro',
    fish: 'Peixe',
    reptile: 'Réptil',
    unknown: 'Desconhecido',
} as const

export type Species = keyof typeof Species

export const Gender = {
    male: 'male',
    female: 'female',
    unknown: 'unknown',
} as const

export type Gender = keyof typeof Gender

export const GenderBR = {
    male: 'Macho',
    female: 'Fêmea',
    unknown: 'Desconhecido',
} as const

export type KeyOfGender = keyof typeof Gender

export const MapOptionSpecies = {
    dog: 'dog',
    cat: 'cat',
    horse: 'horse',
    rabbit: 'rabbit',
    bird: 'bird',
    fish: 'fish',
    reptile: 'reptile',
    Cachorro: 'dog',
    Gato: 'cat',
    Cavalo: 'horse',
    Coelho: 'rabbit',
    Pássaro: 'bird',
    Peixe: 'fish',
    Réptil: 'reptile',
} as const

export type KeyOfMapOptionSpecies = keyof typeof MapOptionSpecies

const makeSpecie = (
    specie: Species,
    bloodType: ObjectBloodType,
    breedType: ObjectBreed,
) => ({
    label: Species[specie],
    value: specie,
    bloodType: Object.entries(bloodType).map(([key, name]) => ({
        label: name,
        value: key,
    })),
    breedType: Object.entries(breedType).map(([key, name]) => ({
        label: name,
        value: key,
    })),
})

export const dog = makeSpecie('dog', DogBloodType, DogBreed)

export const cat = makeSpecie('cat', CatBloodType, CatBreed)

export const horse = makeSpecie('horse', HorseBloodType, HorseBreed)

export const rabbit = makeSpecie('rabbit', RabbitBloodType, RabbitBreed)

export const bird = makeSpecie('bird', BirdBloodType, BirdBreed)

export const fish = makeSpecie('fish', FishBloodType, FishBreed)

export const reptile = makeSpecie('reptile', ReptileBloodType, ReptileBreed)

export type SpeciesType =
    | typeof dog
    | typeof cat
    | typeof horse
    | typeof rabbit
    | typeof bird
    | typeof fish
    | typeof reptile

export const species = [dog, cat, horse, rabbit, bird, fish, reptile]
