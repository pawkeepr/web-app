import React from 'react'
import CardTutors from '~/Components/organism/card-tutors'

import ListTab from '~/Components/templates/ListTab'
import useListTutors from '~/store/hooks/tutors/use-list-tutors'
import type { IMainResponsibleGuardian } from '~/types/pet-v2'

const TutorsTab = () => {
    const { data: tutors } = useListTutors()

    const cards = (tutors: IMainResponsibleGuardian[]) =>
        tutors?.map((tutor) => <CardTutors key={tutor.cpf_cnpj} tutor={tutor} />)

    return (
        <React.Fragment>
            <ListTab cards={cards} items={tutors || []} />
        </React.Fragment>
    )
}

export default TutorsTab
