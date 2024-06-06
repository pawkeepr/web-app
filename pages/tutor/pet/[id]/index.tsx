import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LayoutTutor } from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-tutor-privates'
import HistoricPetPage from '~/pages/Modules/shared/HistoricPetPage'
import { useModeEditablePet } from '~/pages/Modules/shared/MaintainPetPage/components/hooks/use-mode-editable-pet'
import useProfile from '~/store/hooks/profile/use-profile'

const PetsPage = () => {
    const { data: profile } = useProfile()
    const { onChangeMode } = useModeEditablePet()
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        onChangeMode('readonly')
    }, [])

    return (
        <LayoutTutor>
            <HistoricPetPage
                document={profile?.user_information?.cpf_cnpj}
                id_pet={id as string}
            />
        </LayoutTutor>
    )
}

export default PetsPage

export const getServerSideProps = getServerSidePropsPagesPrivates()
