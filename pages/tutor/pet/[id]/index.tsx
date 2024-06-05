import { useEffect } from 'react'
import { LayoutVeterinary } from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-tutor-privates'
import HistoricPetPage from '~/pages/Modules/shared/HistoricPetPage'
import { useModeEditablePet } from '~/pages/Modules/shared/MaintainPetPage/components/hooks/use-mode-editable-pet'
import useProfile from '~/store/hooks/profile/use-profile'

const PetsPage = ({ id }: { id: string }) => {
    const { data: profile } = useProfile()
    const { onChangeMode } = useModeEditablePet()

    useEffect(() => {
        onChangeMode('readonly')
    }, [])

    return (
        <LayoutVeterinary>
            <HistoricPetPage
                document={profile?.user_information?.cpf_cnpj}
                id_pet={id}
            />
        </LayoutVeterinary>
    )
}

export default PetsPage

export const getServerSideProps = getServerSidePropsPagesPrivates()
