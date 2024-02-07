import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { LayoutVeterinary } from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-veterinary-privates'
import Page from '~/pages/Modules/shared/ProfilePetPage'
import { useModeEditablePet } from '~/pages/Modules/shared/ProfilePetPage/components/hooks/use-mode-editable-pet'

const PetsPage = () => {
    const search = useSearchParams()
    const document = search.get('document') || ''
    const { push } = useRouter()
    const { onChangeMode } = useModeEditablePet()

    useEffect(() => {
        onChangeMode('editable')
    }, [])

    if (!document) return push('/dashboard')

    return (
        <LayoutVeterinary>
            <Page document={document} />
        </LayoutVeterinary>
    )
}

export default PetsPage

export const getServerSideProps = getServerSidePropsPagesPrivates()
