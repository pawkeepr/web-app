import SearchInput from '~/Components/molecules/search-input'
import useProfile from '~/store/hooks/profile/use-profile'
import { TypeProfile } from '~/types/profile'
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
                my-2 mobile:px-2 w-full
                web:gap-2 flex mobile:flex-col h-fit 
                justify-end items-center r
            `}
        >


            <SearchInput placeholder="Digite sua busca" name={name} />
            <FieldAppointmentVet condition={profile?.type_profile === TypeProfile.VETERINARY} />
            <FieldAppointmentTutor condition={profile?.type_profile === TypeProfile.TUTOR} />
        </div>
    )
}

export default BlockSearchAndInputDocument
