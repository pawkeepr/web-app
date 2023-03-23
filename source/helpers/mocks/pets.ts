import MockAdapter from "axios-mock-adapter/types";
import { getCookie, setCookie } from "~/utils/cookies-utils";

import { faker } from '@faker-js/faker';
import { Pet } from "~/store/pets/types";
import * as url from '../url_helper';

const factoryPet = (): Pet => ({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    species: faker.animal.type(),
    breed: faker.animal.dog(),
    gender: 'male',
    dateOfBirth: faker.date.past().toLocaleString(),
    color: faker.color.human(),
    allergies: [],
    preexistingConditions: [],
    medicationsInUse: [],
    healthHistory: [],
    ownerEmergencyContact: {
        name: faker.name.fullName(),
        phone: faker.phone.number('## 9 ####-####'),
        address: faker.address.streetAddress(),
    },
    diet: {
        foodType: 'Ração Premium',
        dailyAmount: faker.datatype.number(10),
        dietaryRestrictions: [],
    },
    created_at: Date.now().toLocaleString(),
    updated_at: Date.now().toLocaleString(),
    activityLevel: 'Ativo',
    avatar: faker.image.animals(1234, 1234, true),
    tutor_id: faker.datatype.uuid(),
    specialPhysicalFeatures: [],
    behavior: faker.lorem.paragraph(),
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
