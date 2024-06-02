import SearchInput from '~/Components/molecules/search-input'
import { AttributeTypeProfile } from '~/services/helpers/types'
import useProfile from '~/store/hooks/profile/use-profile'
import FieldAppointmentTutor from '../field-appointment-tutor'
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
            <SearchInput placeholder="Digite sua busca" name={name} />
            <FieldAppointmentVet
                condition={
                    profile?.type_profile === AttributeTypeProfile.VETERINARY
                }
            />
            <FieldAppointmentTutor
                condition={profile?.type_profile === AttributeTypeProfile.TUTOR}
            />
        </div>
    )
}

export default BlockSearchAndInputDocument
