import AddMedicalRecordsModal from '~/Components/modals/add-medical-records/add-medical-records'

type HistoricPetProps = {
    document?: string
    id_pet?: string
}

const MedicalRecords = (props: HistoricPetProps) => {
    return (
        <div className="relative">
            <AddMedicalRecordsModal item={null} />
        </div>
    )
}

export default MedicalRecords
