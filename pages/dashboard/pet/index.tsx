import { useRouter, useSearchParams } from 'next/navigation'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'
import Page from '~/pages/NewPetPage'

const PetsPage = () => {
    const search = useSearchParams()
    const document = search.get('document') || ''
    const { push } = useRouter()

    if (!document) return push('/dashboard')

    return (
        <Page document={document} />
    )
}

export default PetsPage

export const getServerSideProps = getServerSidePropsPagesPrivates()