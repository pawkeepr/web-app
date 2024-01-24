import FieldDocumentAppointment from '~/Components/molecules/field-document-appointment'
import SearchInput from '~/Components/molecules/search-input'

type BlockSearchAndInputDocumentProps = {
    name: string
}

const BlockSearchAndInputDocument = ({
    name,
}: BlockSearchAndInputDocumentProps) => {
    return (
        <div className="my-2 mobile:px-2 w-full flex h-fit justify-end items-center">
            <SearchInput placeholder="Digite sua busca" name={name} />

            <FieldDocumentAppointment />
        </div>
    )
}

export default BlockSearchAndInputDocument
