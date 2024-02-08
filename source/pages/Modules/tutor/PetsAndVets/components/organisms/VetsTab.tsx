import React from 'react'
import CardVets from '~/Components/organism/card-tutors'

import ListTab from '~/Components/templates/ListTab'
import useListVets from '~/store/hooks/list-vets-by-tutor/use-list-vets'
import useProfile from '~/store/hooks/profile/use-profile'
import type { IMainResponsibleGuardian } from '~/types/pet-v2'

const VetsTab = () => {
    const { data } = useProfile()
    const { vets } = useListVets(data?.user_information?.cpf_cnpj)

    const cards = (vets: IMainResponsibleGuardian[]) =>
        vets?.map((vet) => <CardVets key={vet.cpf_cnpj} vet={vet} />)

    return (
        <React.Fragment>
            <ListTab cards={cards} items={vets || []} />
        </React.Fragment>
    )
}

export default VetsTab
