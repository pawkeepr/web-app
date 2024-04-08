import React from 'react'
import CardVets from '~/Components/organism/card-tutors'

import useListVets from '~/store/hooks/list-vets-by-tutor/use-list-vets'
import useProfile from '~/store/hooks/profile/use-profile'

const VetsTab = () => {
    const { data } = useProfile()
    const { activeData: vets } = useListVets(data?.user_information?.cpf_cnpj as string)

    return (
        <React.Fragment>
            {
                vets?.map((vet) => <CardVets key={vet.cpf_cnpj} tutor={data} />)
            }
        </React.Fragment>
    )
}

export default VetsTab
