import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import LayoutMain from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'
import Page from '~/pages/HistoricPetPage'
import { useModeEditablePet } from '~/pages/NewPetPage/components/hooks/use-mode-editable-pet'

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
            <Page document={document} id_pet={id_pet} />
        </LayoutMain>
    )
}

export default PetsPage

export const getServerSideProps = getServerSidePropsPagesPrivates()
