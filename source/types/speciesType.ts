import type { IconType } from 'react-icons'
import { BsThreeDots } from 'react-icons/bs'
import {
    GiChicken,
    GiGoat,
    GiReptileTail,
    GiSeatedMouse,
    GiSnakeTongue,
    GiTurtle,
} from 'react-icons/gi'
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

export const Species = {
    dog: 'dog',
    cat: 'cat',
    rabbit: 'rabbit',
    fish: 'fish',
    bird: 'bird',
    chicken: 'chicken',
    equine: 'equine',
    bovine: 'bovine',
    chelonians: 'chelonians',
    serpent: 'serpent',
    lizard: 'lizard',
    pig: 'pig',
    caprine: 'caprine',
    rodent: 'rodent',
    unknown: 'unknown',
} as const
export type Species = (typeof Species)[keyof typeof Species]

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
    equine: PiHorseDuotone,
    bovine: PiCowDuotone,
    chelonians: GiTurtle,
    serpent: GiSnakeTongue,
    lizard: GiReptileTail,
    pig: PiPiggyBankDuotone,
    unknown: BsThreeDots,
    caprine: GiGoat,
    rodent: GiSeatedMouse,
} as const
export type KeysIconPets = keyof typeof IconPets

type FabricSpecies = {
    label: string
    value: Species
    icon?: IconType
    bloodType: { label: string; value: string }[]
    breedType: { label: string; value: string }[]
}

const makeSpecie = (
    specie: Species,
    bloodType: ObjectBloodType,
    breedType: ObjectBreed,
): FabricSpecies => ({
    label: specie,
    value: specie,
    icon: IconPets[specie],
    bloodType: Object.entries(bloodType)
        .map(([key, name]) => ({
            label: name,
            value: key,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    breedType: Object.entries(breedType)
        .map(([key, name]) => ({
            label: name,
            value: key,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
})

export const dog = makeSpecie('dog', DogBloodType, DogBreed)

export const cat = makeSpecie('cat', CatBloodType, CatBreed)

export const equine = makeSpecie('equine', HorseBloodType, HorseBreed)

export const rabbit = makeSpecie('rabbit', RabbitBloodType, RabbitBreed)

export const bird = makeSpecie('bird', BirdBloodType, BirdBreed)

export const fish = makeSpecie('fish', FishBloodType, FishBreed)

export const chelonians = makeSpecie('chelonians', ReptileBloodType, TurtleBreed)

export const serpent = makeSpecie('serpent', ReptileBloodType, SnakeBreed)

export const lizard = makeSpecie('lizard', ReptileBloodType, LizardBreed)

export const bovine = makeSpecie('bovine', ReptileBloodType, CowBreed)

export const pig = makeSpecie('pig', ReptileBloodType, PigBreed)

export const chicken = makeSpecie('chicken', ReptileBloodType, ChickenBreed)

export const caprine = makeSpecie('caprine', ReptileBloodType, ChickenBreed)

export const rodent = makeSpecie('rodent', ReptileBloodType, ChickenBreed)

export type SpeciesType =
    | typeof dog
    | typeof cat
    | typeof equine
    | typeof rabbit
    | typeof bird
    | typeof fish
    | typeof chelonians
    | typeof serpent
    | typeof lizard
    | typeof bovine
    | typeof pig
    | typeof chicken
    | typeof caprine
    | typeof rodent

export const species = [
    dog,
    cat,
    equine,
    rabbit,
    bird,
    fish,
    chelonians,
    serpent,
    lizard,
    bovine,
    pig,
    chicken,
    caprine,
    rodent,
].sort((a, b) => a.label.localeCompare(b.label))
