import { Form, Formik } from 'formik'
import { useUpdateMedicalRecordsMutation } from '~/store/hooks/medical-records'
import type { MEDICAL_RECORDS, MedicalRecordEntry } from '~/types/medical-records'

type MedicalRecordForm = {
    type: MEDICAL_RECORDS
    item: MedicalRecordEntry | null
    cpf_cnpj: string
    id_pet: string
}
const MedicalRecordsForm = ({
    cpf_cnpj,
    id_pet,
    item,
    type,
}: MedicalRecordForm) => {
    const updateMutation = useUpdateMedicalRecordsMutation({
        cpf_cnpj,
        id_pet,
        name: type,
    })

    const handleSubmit = (data: MedicalRecordEntry) => {
        updateMutation.mutateAsync({ data })
    }

    return (
        <Formik initialValues={item as MedicalRecordEntry} onSubmit={handleSubmit}>
            {({ handleSubmit }) => <Form onSubmit={handleSubmit}>{/* ... */}</Form>}
        </Formik>
    )
}

export default MedicalRecordsForm
