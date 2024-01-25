import React from 'react'
import CardTutors from '~/Components/organism/card-tutors'

import ListTab from '~/Components/templates/ListTab'
import useListTutors, {
    type ITutorV2Data,
} from '~/store/hooks/tutors/use-list-tutors'

const TutorsTab = () => {
    const { data: tutors } = useListTutors()

    const cards = (tutors: ITutorV2Data[]) =>
        tutors?.map((tutor) => <CardTutors key={tutor.id} tutor={tutor} />)

    return (
        <React.Fragment>
            <ListTab cards={cards} items={tutors || []} />
        </React.Fragment>
    )
}

export default TutorsTab
