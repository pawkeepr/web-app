import MockAdapter from "axios-mock-adapter/types";
import { getCookie, setCookie } from "~/utils/cookies-utils";

import { faker } from '@faker-js/faker';
import { Tutor } from "~/store/tutor/types";
import * as url from '../url_helper';



const tutors: Array<Tutor> = [
    ...Array(10).fill(0).map(() => ({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        email: faker.internet.email(),
        document: faker.datatype.number(99999999999).toString(),
        created_at: Date.now().toLocaleString(),
        updated_at: Date.now().toLocaleString(),
        avatar: faker.image.avatar(),
        phone: faker.phone.number('## 9 ####-####')
    })),
]

const getTutors = () => {

    try {
        const cookie = getCookie('tutors-mock')
        return (cookie || tutors) as Array<any>
    } catch (error) {
        console.log(error)
        return tutors
    }

}

function factoryTutors(adapter: MockAdapter) {
    adapter.onGet(url.GET_TUTORS).reply(config => {

        const tutors = getTutors()

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve([200, { data: tutors }]);
            }, 1000)
        })
    })

    adapter.onPost(url.ADD_TUTORS).reply((config) => {

        const tutor = JSON.parse(config["data"]);

        const tutors = getTutors()

        const isValid = tutors.filter(
            usr => usr.document === tutor.document || usr.email === tutor.email
        );


        return new Promise((resolve, reject) => {

            tutors.push({ id: faker.datatype.uuid(), created_at: Date.now().toLocaleString(), ...tutor })

            if (isValid.length > 0) {
                return reject([400, { message: 'Este Tutor já existe!' }]);
            }

            try {
                const maxAge = 60 * 60 * 24 * 30
                setCookie('tutors-mock', JSON.stringify(tutors), maxAge)

            } catch (error) {
                console.log(error)
            }

            setTimeout(() => {
                return resolve([200, { data: tutor }]);
            }, 1000)
        })
    })
}

export default factoryTutors
