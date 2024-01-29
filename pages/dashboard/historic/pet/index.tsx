import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import LayoutMain from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'
import HistoricPetPage from '~/pages/Modules/shared/HistoricPetPage'
import { useModeEditablePet } from '~/pages/Modules/shared/NewPetPage/components/hooks/use-mode-editable-pet'

const PetsPage = () => {
    const search = useSearchParams()
    const document = search.get('document') || ''
    const id_pet = search.get('id_pet') || undefined
    const { onChangeMode } = useModeEditablePet()

    useEffect(() => {
        onChangeMode('readonly')
    }, [])

    return (
        <LayoutMain>
            <HistoricPetPage document={document} id_pet={id_pet} />
        </LayoutMain>
    )
}

export default PetsPage

export const getServerSideProps = getServerSidePropsPagesPrivates()
