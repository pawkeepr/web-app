import DashboardLayouts from '../_layouts/dashboard'

import type { IPet } from '~/types/pet'
import CreateOrUpdatePetPage from './CreateOrUpdatePetPage'

export type InitialValues = Nullable<IPet>

type PetPageProps = {
    document?: string
    id_pet?: string
}

const NewPetPage = (props: PetPageProps) => {
    return (
        <DashboardLayouts title="Novo Pet" searchBlock={false}>
            <CreateOrUpdatePetPage {...props} />
        </DashboardLayouts>
    )
}

export default NewPetPage
