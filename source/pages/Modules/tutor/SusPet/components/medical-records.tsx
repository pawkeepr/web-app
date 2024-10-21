import { format } from 'date-fns'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { BodyEvolutionFormModal } from '~/Components/forms/medical-records-form/forms/body-evolution-form/body-evolution-form'
import { DentalProcedureFormModal } from '~/Components/forms/medical-records-form/forms/dental-procedure-form'
import {
    AllergiesFormModal,
    DiseaseFormModal,
    InjuriesFormModal,
} from '~/Components/forms/medical-records-form/forms/disease-form'
import { ExamTestFormModal } from '~/Components/forms/medical-records-form/forms/exam-test-form'
import {
    HospitalizationFormModal,
    InternmentsFormModal,
    SurgeriesFormModal,
} from '~/Components/forms/medical-records-form/forms/hospitalization-form'
import { MedicineFormModal } from '~/Components/forms/medical-records-form/forms/medicine-form'
import { NutritionFormModal } from '~/Components/forms/medical-records-form/forms/nutrition-form'
import { PhysicalActivityFormModal } from '~/Components/forms/medical-records-form/forms/physical-activity-form'
import { VaccinesFormModal } from '~/Components/forms/medical-records-form/forms/vaccines-form'
import AllergiesItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/allergies-item'
import BodyEvolutionItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/body-evolution-item'
import DentalProcedureItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/dental-procedures'
import DiseaseItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/diseases-item'
import ExamItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/exam-item'
import HospitalizationsItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/hospitalizations-item'
import InjuriesItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/injuries-item'
import InternmentsItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/internments-item'
import MedicationsItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/medications-item'
import NutritionItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/nutritions-item'
import PhysicalActivityItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/physical-activity-item'
import { itemStyle } from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/styles'
import SurgeriesItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/surgeries-item'
import VaccineItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/vaccines-item'
import {
    useGetMedicalRecordsByPet,
    useHandleMedicalRecordsMutation,
} from '~/store/hooks/medical-records'
import useProfile from '~/store/hooks/profile/use-profile'
import { MEDICAL_RECORDS, type MedicalRecordEntry } from '~/types/medical-records'
import { NameProfile } from '~/types/profile'

type HistoricPetProps = {
    document: string
    id_pet: string
    type?: MEDICAL_RECORDS
}

type ItemsRecordsProps = {
    title: string
    children: React.ReactNode
    condition?: boolean
    classNames?: {
        title?: string
        content?: string
    }
}

const ItemsRecords = ({
    children,
    title,
    classNames = {},
    condition,
}: ItemsRecordsProps) => {
    if (!condition) return <></>
    return (
        <section className="w-full ">
            <h1 className="w-full">
                <span className={classNames?.title}>{title}</span>
            </h1>
            <div className={twMerge('', classNames?.content)}>{children}</div>
        </section>
    )
}

const classNames = {
    title: 'text-base font-bold text-gray-600 mb-2',
    content: 'text-gray-500 text-sm',
}

const MedicalRecord = ({ id_pet, document, type }: HistoricPetProps) => {
    const { data, error, isPending } = useGetMedicalRecordsByPet({
        id_pet: id_pet as string,
        cpf_cnpj: document as string,
    })

    if (error) return <div>Erro ao carregar prontuário</div>

    if (isPending) return <div>Carregando...</div>
    const { data: profile } = useProfile()

    const handleSubmitHelper = useHandleMedicalRecordsMutation({
        id_pet: id_pet as string,
        name: type as MEDICAL_RECORDS,
        cpf_cnpj: document as string,
    })

    const item = useMemo(() => {
        return {
            id: '',
            id_appointment: '',
            coin: 'BRL',
            date_application: format(new Date(), 'dd-MM-yyyy'),
            type_profile:
                profile?.user_information?.type_profile &&
                NameProfile[profile?.user_information?.type_profile],
            cpf_cnpj_who_applied: profile?.user_information?.cpf_cnpj,
            who_applied: profile?.user_information?.name,
        }
    }, [profile])

    const handleSubmit = async (values: MedicalRecordEntry) => {
        return await handleSubmitHelper({
            ...item,
            ...values,
        } as unknown as MedicalRecordEntry)
    }

    const body_evolution = data?.list_well_being?.body_evolution
    const list_dental_procedures = data?.list_dental_procedures
    const exams = data?.list_exams_tests
    const physical_activities = data?.list_well_being?.physical_activities
    const hospitalizations = data?.list_hospital_information?.hospitalizations
    const surgeries = data?.list_hospital_information?.surgeries
    const diseases = data?.list_hospital_information?.diseases
    const injuries = data?.list_hospital_information?.injuries
    const internment = data?.list_hospital_information?.internment
    const allergies = data?.list_hospital_information?.allergies
    const medicines = data?.list_medicines
    const vaccines = data?.list_vaccines
    const nutritions = data?.list_nutritions

    return (
        <section className="relative gap-2 p-4 mt-2">
            <ItemsRecords
                title="Evolução Corporal"
                classNames={classNames}
                condition={type === MEDICAL_RECORDS.BODY_EVOLUTION}
            >
                <ul className={itemStyle.ul()}>
                    {body_evolution?.map((item) => (
                        <BodyEvolutionItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={id_pet}
                        />
                    ))}

                    <li>
                        <BodyEvolutionFormModal
                            handleSubmit={handleSubmit}
                            item={null}
                            handleClose={() => {}}
                        />
                    </li>
                </ul>
            </ItemsRecords>

            <ItemsRecords
                title="Procedimentos Dentários"
                classNames={classNames}
                condition={type === MEDICAL_RECORDS.DENTAL_PROCEDURES}
            >
                <ul className={itemStyle.ul()}>
                    {list_dental_procedures?.map((item) => (
                        <DentalProcedureItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={id_pet}
                        />
                    ))}
                    <li>
                        <DentalProcedureFormModal
                            handleSubmit={handleSubmit}
                            item={null}
                            handleClose={() => {}}
                        />
                    </li>
                </ul>
            </ItemsRecords>

            <ItemsRecords
                title="Exames e Testes"
                classNames={classNames}
                condition={type === MEDICAL_RECORDS.EXAMS}
            >
                <ul className={itemStyle.ul()}>
                    {exams?.map((item) => (
                        <ExamItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={id_pet}
                        />
                    ))}
                    <li>
                        <ExamTestFormModal
                            handleSubmit={handleSubmit}
                            item={null}
                            handleClose={() => {}}
                        />
                    </li>
                </ul>
            </ItemsRecords>

            <ItemsRecords
                title="Atividade Física"
                classNames={classNames}
                condition={type === MEDICAL_RECORDS.PHYSICAL_ACTIVITIES}
            >
                <ul className={itemStyle.ul()}>
                    {physical_activities?.map((item) => (
                        <PhysicalActivityItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={id_pet}
                        />
                    ))}
                    <li>
                        <PhysicalActivityFormModal
                            handleSubmit={handleSubmit}
                            item={null}
                            handleClose={() => {}}
                        />
                    </li>
                </ul>
            </ItemsRecords>

            <ItemsRecords
                title="Hospitalizações"
                classNames={classNames}
                condition={type === MEDICAL_RECORDS.HOSPITALIZATIONS}
            >
                <ul className={itemStyle.ul()}>
                    {hospitalizations?.map((item) => (
                        <HospitalizationsItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={id_pet}
                        />
                    ))}
                    <li>
                        <HospitalizationFormModal
                            handleSubmit={handleSubmit}
                            item={null}
                            handleClose={() => {}}
                        />
                    </li>
                </ul>
            </ItemsRecords>

            <ItemsRecords
                title="Doenças"
                classNames={classNames}
                condition={type === MEDICAL_RECORDS.DISEASES}
            >
                <ul className={itemStyle.ul()}>
                    {diseases?.map((item) => (
                        <DiseaseItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={id_pet}
                        />
                    ))}
                    <li>
                        <DiseaseFormModal
                            handleSubmit={handleSubmit}
                            item={null}
                            handleClose={() => {}}
                        />
                    </li>
                </ul>
            </ItemsRecords>

            <ItemsRecords
                title="Alergias"
                classNames={classNames}
                condition={type === MEDICAL_RECORDS.ALLERGIES}
            >
                <ul className={itemStyle.ul()}>
                    {allergies?.map((item) => (
                        <AllergiesItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={id_pet}
                        />
                    ))}
                    <li>
                        <AllergiesFormModal
                            handleSubmit={handleSubmit}
                            item={null}
                            handleClose={() => {}}
                        />
                    </li>
                </ul>
            </ItemsRecords>

            <ItemsRecords
                title="Internações"
                classNames={classNames}
                condition={type === MEDICAL_RECORDS.INTERNMENTS}
            >
                <ul className={itemStyle.ul()}>
                    {internment?.map((item) => (
                        <InternmentsItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={id_pet}
                        />
                    ))}
                    <li>
                        <InternmentsFormModal
                            handleSubmit={handleSubmit}
                            item={null}
                            handleClose={() => {}}
                        />
                    </li>
                </ul>
            </ItemsRecords>

            <ItemsRecords
                title="Cirurgias"
                classNames={classNames}
                condition={type === MEDICAL_RECORDS.SURGERIES}
            >
                <ul className={itemStyle.ul()}>
                    {surgeries?.map((item) => (
                        <SurgeriesItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={id_pet}
                        />
                    ))}
                    <li>
                        <SurgeriesFormModal
                            handleSubmit={handleSubmit}
                            item={null}
                            handleClose={() => {}}
                        />
                    </li>
                </ul>
            </ItemsRecords>

            <ItemsRecords
                title="Lesões"
                classNames={classNames}
                condition={type === MEDICAL_RECORDS.INJURIES}
            >
                <ul className={itemStyle.ul()}>
                    {injuries?.map((item) => (
                        <InjuriesItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={id_pet}
                        />
                    ))}
                    <li>
                        <InjuriesFormModal
                            handleSubmit={handleSubmit}
                            item={null}
                            handleClose={() => {}}
                        />
                    </li>
                </ul>
            </ItemsRecords>

            <ItemsRecords
                title="Medicamentos"
                classNames={classNames}
                condition={type === MEDICAL_RECORDS.MEDICINES}
            >
                <ul className={itemStyle.ul()}>
                    {medicines?.map((item) => (
                        <MedicationsItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={id_pet}
                        />
                    ))}
                </ul>
                <li>
                    <MedicineFormModal
                        handleSubmit={handleSubmit}
                        item={null}
                        handleClose={() => {}}
                    />
                </li>
            </ItemsRecords>

            <ItemsRecords
                title="Vacinas"
                classNames={classNames}
                condition={type === MEDICAL_RECORDS.VACCINES}
            >
                <ul className={itemStyle.ul()}>
                    {vaccines?.map((item) => (
                        <VaccineItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={id_pet}
                        />
                    ))}
                </ul>
                <li>
                    <VaccinesFormModal
                        handleSubmit={handleSubmit}
                        item={null}
                        handleClose={() => {}}
                    />
                </li>
            </ItemsRecords>

            <ItemsRecords
                title="Nutrição"
                classNames={classNames}
                condition={type === MEDICAL_RECORDS.NUTRITIONS}
            >
                <ul className={itemStyle.ul()}>
                    {nutritions?.map((item) => (
                        <NutritionItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={id_pet}
                        />
                    ))}
                    <li>
                        <NutritionFormModal
                            handleSubmit={handleSubmit}
                            item={null}
                            handleClose={() => {}}
                        />
                    </li>
                </ul>
            </ItemsRecords>
        </section>
    )
}

export default MedicalRecord
