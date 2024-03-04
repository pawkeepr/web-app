import AddMedicalRecordsModal from '~/Components/modals/add-medical-records/add-medical-records'

type HistoricPetProps = {
    document?: string
    id_pet?: string
}

const MedicalRecords = ({ id_pet, document }: HistoricPetProps) => {
    return (
        <div className="relative">
            <AddMedicalRecordsModal
                item={null}
                cpf_cnpj={document as string}
                id_pet={id_pet as string}
            />
        </div>
    )
}

export default MedicalRecords
