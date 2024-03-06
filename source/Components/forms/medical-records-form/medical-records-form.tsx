import withControl from '~/Components/helpers/with-control'
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
import TreatmentsForm from './forms/treatments-form'
import VaccinesForm from './forms/vaccines-form'
export type OptionFormsProps<T> = {
    item: T | null
    handleSubmit: (data: MedicalRecordEntry) => void
    handleClose?: () => void
}

export const OptionsForms = new Map<
    MEDICAL_RECORDS,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (props: OptionFormsProps<any>) => JSX.Element
>([
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
    [MEDICAL_RECORDS.TREATMENTS, TreatmentsForm],
])

type MedicalRecordForm = {
    type: MEDICAL_RECORDS
    item: MedicalRecordEntry | null
    cpf_cnpj: string
    id_pet: string
    handleClose?: () => void
    onChangeIndex?: (index: number) => void
}

const MedicalRecordsForm = ({
    cpf_cnpj,
    id_pet,
    item,
    type,
    handleClose,
}: MedicalRecordForm) => {
    const updateMutation = useUpdateMedicalRecordsMutation({
        cpf_cnpj,
        id_pet,
        name: type,
    })

    const FormComponent = OptionsForms.get(type) || (() => <></>)

    const handleSubmit = async (data: MedicalRecordEntry) => {
        await updateMutation.mutateAsync({ data })
    }

    return (
        <FormComponent
            item={item}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
        />
    )
}

export default withControl(MedicalRecordsForm)
