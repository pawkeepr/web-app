import withControl from '~/Components/helpers/with-control'
import SearchInput from '~/Components/molecules/search-input'
import useProfile from '~/store/hooks/profile/use-profile'
import { TypeProfile } from '~/types/profile'
import FieldAppointmentVet from '../field-appointment-vet'

type BlockSearchAndInputDocumentProps = {
    name: string
}

const BlockSearchAndInputDocument = ({
    name,
}: BlockSearchAndInputDocumentProps) => {
    const { data: profile } = useProfile()

    return (
        <div
            className={`
                mobile:px-2 w-full 
                web:gap-2 flex mobile:flex-col
                justify-end items-center web:mb-2
            `}
        >
            <SearchInput
                condition={profile?.type_profile === TypeProfile.VETERINARY}
                placeholder="Digite sua busca"
                name={name}
            />
            <FieldAppointmentVet
                condition={profile?.type_profile === TypeProfile.VETERINARY}
            />
        </div>
    )
}

export default withControl(BlockSearchAndInputDocument)
