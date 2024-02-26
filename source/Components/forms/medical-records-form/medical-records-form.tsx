import { Form, Formik } from 'formik'
import { useUpdateMedicalRecordsMutation } from '~/store/hooks/medical-records'
import { MEDICAL_RECORDS, type MedicalRecordEntry } from '~/types/medical-records'
import BodyEvolutionForm from './forms/body-evolution-form'
import DentalProcedureForm from './forms/dental-procedure-form'
import DiseaseForm from './forms/disease-form'
import ExamAndTestForm from './forms/exam-test-form'
import HospitalizationForm from './forms/hospitalization-form'
import MedicineForm from './forms/medicine-form'
import NutritionForm from './forms/nutrition-form'
import PhysicalActivityForm from './forms/physical-activity-form'
import VaccinesForm from './forms/vaccines-form'

export const OptionsForms = new Map<MEDICAL_RECORDS, () => JSX.Element>([
    [MEDICAL_RECORDS.BODY_EVOLUTION, BodyEvolutionForm],
    [MEDICAL_RECORDS.HOSPITALIZATIONS, HospitalizationForm],
    [MEDICAL_RECORDS.INTERNMENTS, HospitalizationForm],
    [MEDICAL_RECORDS.SURGERIES, HospitalizationForm],
    [MEDICAL_RECORDS.DISEASES, DiseaseForm],
    [MEDICAL_RECORDS.ALLERGIES, DiseaseForm],
    [MEDICAL_RECORDS.INJURIES, DiseaseForm],
    [MEDICAL_RECORDS.DENTAL_PROCEDURES, DentalProcedureForm],
    [MEDICAL_RECORDS.NUTRITIONS, NutritionForm],
    [MEDICAL_RECORDS.PHYSICAL_ACTIVITIES, PhysicalActivityForm],
    [MEDICAL_RECORDS.MEDICINES, MedicineForm],
    [MEDICAL_RECORDS.EXAMS, ExamAndTestForm],
    [MEDICAL_RECORDS.VACCINES, VaccinesForm],
    [MEDICAL_RECORDS.TREATMENTS, HospitalizationForm],
])

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

    const FormComponent = OptionsForms.get(type) || MedicineForm

    const handleSubmit = (data: MedicalRecordEntry) => {
        updateMutation.mutateAsync({ data })
    }

    return (
        <Formik initialValues={item as MedicalRecordEntry} onSubmit={handleSubmit}>
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="h-screen">
                    <FormComponent />
                </Form>
            )}
        </Formik>
    )
}

export default MedicalRecordsForm
