import { useRouter, useSearchParams } from 'next/navigation'
import { LayoutVeterinary } from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-veterinary-privates'
import AppointmentsPage from '~/pages/Modules/veterinary/AppointmentsPage/Appointments'
import { getPet } from '~/services/helpers'

const AppointmentsNext = ({ data, status }) => {
    console.log('🚀 ~ AppointmentsNext ~ { data, status }:', { data, status })
    const search = useSearchParams()
    const document = search.get('document') || ''
    const pet = search.get('pet') || ''
    const appointment_id = search.get('appointment_id') || ''

    const { push } = useRouter()

    if (!document || !pet) return push('/dashboard')

    return (
        <LayoutVeterinary>
            <AppointmentsPage
                document={document}
                pet={pet}
                appointment_id={appointment_id}
            />
        </LayoutVeterinary>
    )
}

export default AppointmentsNext
export const getServerSideProps = getServerSidePropsPagesPrivates(
    async ({ query }) => {
        const { document, pet } = query

        const { data, status } = await getPet(document as string, pet as string)

        return {
            props: {
                data,
                status,
            },
        }
    },
)
