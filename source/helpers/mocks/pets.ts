import MockAdapter from "axios-mock-adapter/types";
import { getCookie, setCookie } from "~/utils/cookies-utils";

import { faker } from '@faker-js/faker';
import { CatBloodType } from "~/store/pets/bloodType";
import { CatBreed } from "~/store/pets/breedType";
import { Species } from "~/store/pets/speciesType";
import { GenderPet, Pet } from "~/store/pets/types";
import * as url from '../url_helper';

const factoryPet = (): Pet => ({
    id: faker.datatype.uuid(),
    name: faker.name.middleName(),
    species: Species.cat,
    breed: CatBreed.ViraLata,
    gender: GenderPet.unknown,
    dateOfBirth: faker.date.past().toLocaleString(),
    color: faker.color.human(),
    allergies: [],
    preexistingConditions: [],
    medicationsInUse: [],
    healthHistory: [],
    ownerEmergencyContact: {
        name: faker.name.fullName(),
        phone: faker.phone.number('## 9 ####-####'),
        document: faker.datatype.number(99999999999).toString(),
    },
    diet: {
        foodType: 'Ração Premium',
        dailyAmount: faker.datatype.number(10),
        dietaryRestrictions: [],
    },
    created_at: Date.now().toLocaleString(),
    updated_at: Date.now().toLocaleString(),
    activityLevel: 'Ativo',
    avatar: faker.image.cats(1234, 1234, true),
    bloodType: CatBloodType.A,
    specialPhysicalFeatures: [],
    behavior: faker.lorem.paragraph(),
    castrated: faker.datatype.boolean(),
    dateOfCastration: faker.date.past().toLocaleString(),
    dateOfAdoption: faker.date.past().toLocaleString(),
})

const pets: Array<Pet> = [
    ...Array(10).fill(0).map(() => factoryPet()),
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
    adapter.onGet(url.GET_PETS).reply(config => {

        const pets = getPets()

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve([200, { data: pets }]);
            }, 1000)
        })
    })

    adapter.onPost(url.ADD_PETS).reply((config) => {

        const pet = JSON.parse(config["data"]);

        const pets = getPets()

        const isValid = pets.filter(
            usr => usr.document === pet.document || usr.email === pet.email
        );


        return new Promise((resolve, reject) => {

            pets.push({ id: faker.datatype.uuid(), created_at: Date.now().toLocaleString(), ...pet })

            if (isValid.length > 0) {
                return reject([400, { message: 'Este Pet já existe!' }]);
            }

            try {
                const maxAge = 60 * 60 * 24 * 30
                setCookie('pets-mock', JSON.stringify(pets), maxAge)

            } catch (error) {
                console.log(error)
            }

            setTimeout(() => {
                return resolve([200, { data: pet }]);
            }, 1000)
        })
    })
}

export default factoryMockPets
