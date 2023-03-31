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
    DogBreed,
    FishBreed,
    HorseBreed,
    ReptileBreed
} from './breedType';

export type Species = 'dog' | 'cat' | 'horse' | 'rabbit' | 'bird' | 'fish' | 'reptile';

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





export const species = [
    dog,
    cat,
    horse,
    rabbit,
    bird,
    fish,
    reptile,
];