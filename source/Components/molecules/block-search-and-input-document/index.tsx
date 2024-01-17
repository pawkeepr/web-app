import FieldDocumentAppointment from '~/Components/molecules/field-document-appointment'
import SearchInput from '~/Components/molecules/search-input'

type BlockSearchAndInputDocumentProps = {
    name: string
}

const BlockSearchAndInputDocument = ({
    name,
}: BlockSearchAndInputDocumentProps) => {
    return (
        <div className="my-2 w-full mobile:my-2 flex h-fit justify-end items-center">
            <div className="h-fit w-full">
                <SearchInput placeholder="Digite sua busca" name={name} />
            </div>
            <FieldDocumentAppointment />
        </div>
    )
}

export default BlockSearchAndInputDocument
