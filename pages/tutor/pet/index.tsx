import { useEffect } from 'react'
import { LayoutTutor } from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-tutor-privates'
import Page from '~/pages/Modules/shared/MaintainPetPage'
import { useModeEditablePet } from '~/pages/Modules/shared/MaintainPetPage/components/hooks/use-mode-editable-pet'
import useProfile from '~/store/hooks/profile/use-profile'

const PetsPage = () => {
    const { data: profile } = useProfile()
    const { onChangeMode } = useModeEditablePet()

    useEffect(() => {
        onChangeMode('editable')
    }, [])

    return (
        <LayoutTutor>
            <Page document={profile?.user_information?.cpf_cnpj} />
        </LayoutTutor>
    )
}

export default PetsPage

export const getServerSideProps = getServerSidePropsPagesPrivates()
