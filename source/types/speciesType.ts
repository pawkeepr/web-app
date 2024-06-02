import type { IconType } from 'react-icons'
import { BsThreeDots } from 'react-icons/bs'
import { GiChicken, GiReptileTail, GiSnakeTongue, GiTurtle } from 'react-icons/gi'
import {
    PiBirdDuotone,
    PiCatDuotone,
    PiCowDuotone,
    PiDogDuotone,
    PiFishDuotone,
    PiHorseDuotone,
    PiPiggyBankDuotone,
    PiRabbitDuotone,
} from 'react-icons/pi'
import ptBr from '~/common/languages/pt-BR/common.json'
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
    ChickenBreed,
    CowBreed,
    DogBreed,
    FishBreed,
    HorseBreed,
    LizardBreed,
    PigBreed,
    RabbitBreed,
    SnakeBreed,
    TurtleBreed,
    type ObjectBreed,
} from './breedType'

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
    turtle: 'turtle',
    snake: 'snake',
    lizard: 'lizard',
    cow: 'cow',
    pig: 'pig',
    chicken: 'chicken',
    Cachorro: 'dog',
    Gato: 'cat',
    Cavalo: 'horse',
    Coelho: 'rabbit',
    Pássaro: 'bird',
    Peixe: 'fish',
    Tartaruga: 'turtle',
    Cobra: 'snake',
    Lagarto: 'lizard',
    Galinha: 'chicken',
    Vaca: 'cow',
    Porco: 'pig',
    unknown: 'unknown',
} as const

export type KeyOfMapOptionSpecies = keyof typeof MapOptionSpecies

const makeSpecie = (
    specie: string,
    bloodType: ObjectBloodType,
    breedType: ObjectBreed,
) => ({
    label: ptBr[specie as keyof typeof ptBr],
    value: specie,
    bloodType: Object.entries(bloodType)
        .map(([key, name]) => ({
            label: name,
            value: key,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    breedType: Object.entries(breedType)
        .map(([key, name]) => ({
            label: ptBr[name],
            value: key,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
})

export const dog = makeSpecie('dog', DogBloodType, DogBreed)

export const cat = makeSpecie('cat', CatBloodType, CatBreed)

export const horse = makeSpecie('horse', HorseBloodType, HorseBreed)

export const rabbit = makeSpecie('rabbit', RabbitBloodType, RabbitBreed)

export const bird = makeSpecie('bird', BirdBloodType, BirdBreed)

export const fish = makeSpecie('fish', FishBloodType, FishBreed)

export const turtle = makeSpecie('turtle', ReptileBloodType, TurtleBreed)

export const snake = makeSpecie('snake', ReptileBloodType, SnakeBreed)

export const lizard = makeSpecie('lizard', ReptileBloodType, LizardBreed)

export const cow = makeSpecie('cow', ReptileBloodType, CowBreed)

export const pig = makeSpecie('pig', ReptileBloodType, PigBreed)

export const chicken = makeSpecie('chicken', ReptileBloodType, ChickenBreed)

export type SpeciesType =
    | typeof dog
    | typeof cat
    | typeof horse
    | typeof rabbit
    | typeof bird
    | typeof fish
    | typeof turtle
    | typeof snake
    | typeof lizard
    | typeof cow
    | typeof pig
    | typeof chicken

export const species = [
    dog,
    cat,
    horse,
    rabbit,
    bird,
    fish,
    turtle,
    snake,
    lizard,
    cow,
    pig,
    chicken,
].sort((a, b) => a.label.localeCompare(b.label))

type RecordIconPets = {
    [key in SpeciesType['value']]: IconType
}

export const IconPets: RecordIconPets = {
    dog: PiDogDuotone,
    cat: PiCatDuotone,
    rabbit: PiRabbitDuotone,
    fish: PiFishDuotone,
    bird: PiBirdDuotone,
    chicken: GiChicken,
    horse: PiHorseDuotone,
    cow: PiCowDuotone,
    turtle: GiTurtle,
    snake: GiSnakeTongue,
    lizard: GiReptileTail,
    pig: PiPiggyBankDuotone,
    unknown: BsThreeDots,
} as const
export type KeysIconPets = keyof typeof IconPets
