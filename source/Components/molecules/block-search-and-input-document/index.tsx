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
        <div
            className={`
                my-2 mobile:px-2 w-full
                web:gap-2 flex mobile:flex-col h-fit 
                justify-end items-center r
            `}
        >
            <FieldAppointmentTutor condition={title !== 'Dashboard'} />

            <SearchInput placeholder="Digite sua busca" name={name} />
        </div>
    )
}

export default BlockSearchAndInputDocument
