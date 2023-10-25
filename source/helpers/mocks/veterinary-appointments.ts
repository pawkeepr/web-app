import MockAdapter from "axios-mock-adapter/types";

import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

import { Diseases, diseases } from '~/common/data/diseases';
import { Exams, exams } from '~/common/data/exams';
import { treatments } from '~/common/data/treatments';
import { Vaccines, vaccines } from '~/common/data/vaccines';

import { getCookie, setCookie } from "~/utils/cookies-utils";

import * as url from '../url_helper';

const severity = ['Leve', 'Moderado', 'Grave', 'Muito Grave']

const factoryTreatments = (n: number): any[] => {
    return Array(n).fill(0).map(() => ({
        id: faker.string.uuid(),
        medicine: sample(treatments) || 'Medicamento',
        dose: faker.number.int(1000).toString() + 'mg',
        continuos: faker.datatype.boolean(),
        frequency: faker.number.int(1000).toString(),
        duration: faker.number.int(1000).toString(),
        created_at: Date.now().toLocaleString(),
        updated_at: Date.now().toLocaleString(),
    }))
}



const factoryExams = (n: number): Exams[] => {
    return Array(n).fill(0).map(() => ({
        id: faker.string.uuid(),
        name: sample(exams) || 'Exame',
    }))
}

const factoryVaccines = (n: number): Vaccines[] => {
    return Array(n).fill(0).map(() => ({
        id: faker.string.uuid(),
        name: sample(vaccines) || 'Vacina',
    }))
}

const factoryDiseases = (n: number): Diseases[] => {
    return Array(n).fill(0).map(() => ({
        id: faker.string.uuid(),
        name: sample(diseases) || 'Doença',
        severity: sample(severity) || 'Leve',
        symptoms: [],
        description: faker.lorem.sentence(),
        created_at: Date.now().toLocaleString(),
        updated_at: Date.now().toLocaleString(),
    }))
}

const factoryVeterinaryAppointment = (): any => ({
    id: faker.string.uuid(),
    pet: {
        id: faker.string.uuid(),
        name: faker.person.middleName(),
        breed: faker.animal.cat(),
        avatar: faker.image.urlLoremFlickr({ category: 'cats' }),
        species: 'Felino'
    },
    tutor: {
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        phone: faker.phone.number(),
        avatar: faker.image.avatar()
    },
    created_at: Date.now().toLocaleString(),
    updated_at: Date.now().toLocaleString(),
    exams: factoryExams(faker.number.int({ min: 0, max: 3 })),
    vaccines: factoryVaccines(faker.number.int({ min: 0, max: 3 })),
    treatments: factoryTreatments(faker.number.int({ min: 1, max: 3 })),
    diseases: factoryDiseases(faker.number.int({ min: 1, max: 2 })),
})

const veterinary_appointments: Array<any> = [
    ...Array(10).fill(0).map(() => factoryVeterinaryAppointment()),
]

const getVeterinaryAppointments = () => {

    try {
        const cookie = getCookie('veterinary_appointments-mock')
        return (cookie || veterinary_appointments) as Array<any>
    } catch (error) {
        console.log(error)
        return veterinary_appointments
    }

}

function factoryMockVeterinaryAppointments(adapter: MockAdapter) {
    adapter.onGet(url.GET_VETERINARY_APPOINTMENTS).reply(config => {

        const veterinary_appointments = getVeterinaryAppointments()

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve([200, { data: veterinary_appointments }]);
            }, 1000)
        })
    })

    adapter.onPost(url.ADD_VETERINARY_APPOINTMENTS).reply((config) => {

        const veterinary_appointment = JSON.parse(config["data"]);

        const veterinary_appointments = getVeterinaryAppointments()

        return new Promise((resolve, reject) => {

            veterinary_appointments.push({ id: faker.string.uuid(), created_at: Date.now().toLocaleString(), ...veterinary_appointment })

            try {
                const maxAge = 60 * 60 * 24 * 30
                setCookie('veterinary-appointment-mock', JSON.stringify(veterinary_appointments), maxAge)

            } catch (error) {
                console.log(error)
            }

            setTimeout(() => {
                return resolve([200, { data: pet }]);
            }, 1000)
        })
    })
}

export default factoryMockVeterinaryAppointments


