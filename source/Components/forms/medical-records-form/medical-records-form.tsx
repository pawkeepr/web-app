import { format } from 'date-fns'
import withControl from '~/Components/helpers/with-control'
import { useUpdateMedicalRecordsMutation } from '~/store/hooks/medical-records'
import useProfile from '~/store/hooks/profile/use-profile'
import { MEDICAL_RECORDS, type MedicalRecordEntry } from '~/types/medical-records'
import { NameProfile } from '~/types/profile'
import BodyEvolutionForm from './forms/body-evolution-form'
import DentalProcedureForm from './forms/dental-procedure-form'
import DiseaseForm from './forms/disease-form'
import ExamAndTestForm from './forms/exam-test-form'
import HospitalizationForm from './forms/hospitalization-form'
import MedicineForm from './forms/medicine-form'
import NutritionForm from './forms/nutrition-form'
import PhysicalActivityForm from './forms/physical-activity-form'
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
    onChangeIndex,
}: MedicalRecordForm) => {
    const updateMutation = useUpdateMedicalRecordsMutation({
        cpf_cnpj,
        id_pet,
        name: type,
    })

    const FormComponent = OptionsForms.get(type) || (() => <></>)
    const { data } = useProfile()

    const handleSubmit = async (data: MedicalRecordEntry) => {
        await updateMutation.mutateAsync({ data })
        onChangeIndex?.(0)
    }

    return (
        <FormComponent
            item={
                {
                    coin: 'BRL',
                    date_application: format(new Date(), 'dd-MM-yyyy'),
                    type_profile:
                        data?.user_information?.type_profile &&
                        NameProfile[data?.user_information?.type_profile],
                    cpf_cnpj_who_applied: data?.user_information?.cpf_cnpj,
                    who_applied: data?.user_information?.name,
                    ...item,
                } as MedicalRecordEntry
            }
            handleSubmit={handleSubmit}
            handleClose={handleClose}
        />
    )
}

export default withControl(MedicalRecordsForm)
