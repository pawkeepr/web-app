import FieldDocumentAppointment from '~/Components/molecules/field-appointment-vet'
import SearchInput from '~/Components/molecules/search-input'
import FieldAppointmentTutor from '../field-appointment-tutor'

type BlockSearchAndInputDocumentProps = {
    name: string
    title: string
}

const BlockSearchAndInputDocument = ({
    name,
    title,
}: BlockSearchAndInputDocumentProps) => {
    return (
        <div className="my-2 mobile:px-2 w-full web:gap-2 mobile:gap-0 flex mobile:flex-col h-fit justify-end items-center">
            {title === 'Dashboard' ? (
                <FieldDocumentAppointment />
            ) : (
                <FieldAppointmentTutor />
            )}
            <SearchInput placeholder="Digite sua busca" name={name} />
        </div>
    )
}

export default BlockSearchAndInputDocument
