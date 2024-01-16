import type MockAdapter from 'axios-mock-adapter/types'
import { getCookie, setCookie } from '~/utils/cookies-utils'

import { faker } from '@faker-js/faker'
import type { Pet } from '~/store/slices/pets/types'
import { CatBloodType } from '~/types/bloodType'
import { CatBreed } from '~/types/breedType'
import { Species } from '~/types/speciesType'
import * as url from '../url_helper'

import _ from 'lodash'

const factoryBreeds = (species: Species): string => {
    if (species === Species.cat) {
        // escolha aleatória de uma raça de gato com lodash
        const breed = _.sample(Object.values(CatBreed))
        return breed || CatBreed.ViraLata
    }
    return CatBreed.ViraLata
}

const factoryBloodType = (): string => {
    // escolha aleatória de um tipo sanguíneo de gato
    const bloodType = _.sample(Object.values(CatBloodType))
    return bloodType || CatBloodType.A
}

const factoryPet = (document?: string, name?: string): Pet => ({
    id: faker.string.uuid(),
    name: faker.person.middleName(),
    species: Species.cat,
    breed: factoryBreeds(Species.cat),
    gender: 'unknown',
    dateOfBirth: faker.date.past().toLocaleString(),
    color: faker.color.human(),
    allergies: [],
    preexistingConditions: [],
    medicationsInUse: [],
    healthHistory: [],
    ownerEmergencyContact: {
        id: faker.string.uuid(),
        name: name || faker.person.fullName(),
        phone: faker.phone.number(),
        document: document || faker.number.int(99999999999).toString(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        created_at: Date.now().toLocaleString(),
        updated_at: Date.now().toLocaleString(),
        address: {
            street: faker.location.street(),
            number: faker.number.int().toString(),
            complement: faker.location.secondaryAddress(),
            neighborhood: faker.location.city(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode('###########'),
        },
    },
    diet: {
        foodType: 'Ração Premium',
        dailyAmount: faker.number.int(10),
        dietaryRestrictions: [],
    },
    created_at: Date.now().toLocaleString(),
    updated_at: Date.now().toLocaleString(),
    activityLevel: 'Ativo',
    avatar: faker.image.urlLoremFlickr({ category: 'cats' }),
    bloodType: factoryBloodType(),
    specialPhysicalFeatures: [],
    behavior: faker.lorem.paragraph(),
    castrated: faker.datatype.boolean(),
    dateOfCastration: faker.date.past().toLocaleString(),
    dateOfAdoption: faker.date.past().toLocaleString(),
})

const pets: Array<Pet> = [
    ...Array(10)
        .fill(0)
        .map(() => factoryPet()),
    ...Array(3)
        .fill(0)
        .map(() => factoryPet('00000000000', 'Murilo Montino')),
]

const getPets = () => {
    try {
        const cookie = getCookie('pets-mock')
        return (cookie || pets) as Array<any>
    } catch (error) {
        console.log(error)
        return pets
    }
}

function factoryMockPets(adapter: MockAdapter) {
    adapter.onGet(url.GET_PETS).reply((config) => {
        const pets = getPets()

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve([200, { data: pets }])
            }, 1000)
        })
    })

    adapter.onPost(url.ADD_PETS).reply((config) => {
        const pet = JSON.parse(config.data)

        const pets = getPets()

        return new Promise((resolve, reject) => {
            const newPet = {
                id: faker.string.uuid(),
                created_at: Date.now().toLocaleString(),
                ...pet,
            }
            pets.push(newPet)

            try {
                const maxAge = 60 * 60 * 24 * 30
                setCookie('pets-mock', JSON.stringify(pets), maxAge)
            } catch (error) {
                console.log(error)
            }

            setTimeout(() => {
                return resolve([200, { data: newPet }])
            }, 2500)
        })
    })
}

export default factoryMockPets
