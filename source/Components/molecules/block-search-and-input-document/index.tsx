import FieldDocumentAppointment from '~/Components/molecules/field-document-appointment'
import SearchInput from '~/Components/molecules/search-input'

type BlockSearchAndInputDocumentProps = {
    name: string
}

const BlockSearchAndInputDocument = ({
    name,
}: BlockSearchAndInputDocumentProps) => {
    return (
        <div className="my-2 mobile:px-2 w-full web:gap-2 mobile:gap-0 flex mobile:flex-col h-fit justify-end items-center">
            <FieldDocumentAppointment />
            <SearchInput placeholder="Digite sua busca" name={name} />
        </div>
    )
}

export default BlockSearchAndInputDocument
