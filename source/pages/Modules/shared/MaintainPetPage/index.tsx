import DashboardLayouts from '../../_layouts/dashboard'

import type { IPet } from '~/types/pet'
import ProfilePetPage from './MaintainPetPage'

export type InitialValues = Nullable<IPet>

type PetPageProps = {
    document?: string
    id_pet?: string
}

const MaintainPetPage = (props: PetPageProps) => {
    const title = props.id_pet ? 'Editar Pet' : 'Novo Pet'
    return (
        <DashboardLayouts title={title} searchBlock={false}>
            <ProfilePetPage {...props} />
        </DashboardLayouts>
    )
}

export default MaintainPetPage
