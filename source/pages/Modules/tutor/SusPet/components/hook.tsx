import { useMemo } from 'react'
import { useGetMedicalRecordsByPet } from '~/store/hooks/medical-records'
import { MEDICAL_RECORDS } from '~/types/medical-records'
import type { HistoricPetProps } from './medical-records'

import { BodyEvolutionFormModal } from '~/Components/forms/medical-records-form/forms/body-evolution-form/body-evolution-form'
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
import { MedicationsFormModal } from '~/Components/forms/medical-records-form/forms/medicine-form'
import { NutritionFormModal } from '~/Components/forms/medical-records-form/forms/nutrition-form'
import { PhysicalActivityFormModal } from '~/Components/forms/medical-records-form/forms/physical-activity-form'
import { VaccinesFormModal } from '~/Components/forms/medical-records-form/forms/vaccines-form'
import { useSelectedPet } from '~/hooks/use-selected-pet'
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
import SurgeriesItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/surgeries-item'
import VaccineItem from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/vaccines-item'

type IDataMedicalRecord = {
    [key in MEDICAL_RECORDS]: {
        CardItem: (props: any) => JSX.Element
        FormModal: (props: any) => JSX.Element
        title: string
    }
}

export const DataMedicalRecord: IDataMedicalRecord = {
    [MEDICAL_RECORDS.ALLERGIES]: {
        CardItem: AllergiesItem,
        FormModal: AllergiesFormModal,
        title: 'Alergias',
    },
    [MEDICAL_RECORDS.BODY_EVOLUTION]: {
        CardItem: BodyEvolutionItem,
        FormModal: BodyEvolutionFormModal,
        title: 'Evolução Corporal',
    },
    [MEDICAL_RECORDS.DENTAL_PROCEDURES]: {
        CardItem: DentalProcedureItem,
        FormModal: BodyEvolutionFormModal,
        title: 'Cirurgias',
    },
    [MEDICAL_RECORDS.DISEASES]: {
        CardItem: DiseaseItem,
        FormModal: DiseaseFormModal,
        title: 'Doenças',
    },
    [MEDICAL_RECORDS.EXAMS]: {
        CardItem: ExamItem,
        FormModal: ExamTestFormModal,
        title: 'Exames e Testes',
    },
    [MEDICAL_RECORDS.HOSPITALIZATIONS]: {
        CardItem: HospitalizationsItem,
        FormModal: HospitalizationFormModal,
        title: 'Internamentos',
    },
    [MEDICAL_RECORDS.INJURIES]: {
        CardItem: InjuriesItem,
        FormModal: InjuriesFormModal,
        title: 'Lesões',
    },
    [MEDICAL_RECORDS.INTERNMENTS]: {
        CardItem: InternmentsItem,
        FormModal: InternmentsFormModal,
        title: 'Internamentos',
    },
    [MEDICAL_RECORDS.MEDICINES]: {
        CardItem: MedicationsItem,
        FormModal: MedicationsFormModal,
        title: 'Medicamentos',
    },
    [MEDICAL_RECORDS.NUTRITIONS]: {
        CardItem: NutritionItem,
        FormModal: NutritionFormModal,
        title: 'Nutrição',
    },
    [MEDICAL_RECORDS.PHYSICAL_ACTIVITIES]: {
        CardItem: PhysicalActivityItem,
        FormModal: PhysicalActivityFormModal,
        title: 'Atividade Física',
    },
    [MEDICAL_RECORDS.SURGERIES]: {
        CardItem: SurgeriesItem,
        FormModal: SurgeriesFormModal,
        title: 'Cirurgias',
    },
    [MEDICAL_RECORDS.VACCINES]: {
        CardItem: VaccineItem,
        FormModal: VaccinesFormModal,
        title: 'Vacinas',
    },
    [MEDICAL_RECORDS.TREATMENTS]: {
        CardItem: VaccineItem,
        FormModal: VaccinesFormModal,
        title: 'Tratamentos',
    },
    [MEDICAL_RECORDS.OTHERS]: {
        CardItem: VaccineItem,
        FormModal: VaccinesFormModal,
        title: 'Tratamentos',
    },
} as const

export const useGetMedicalRecordsByType = ({ type }: HistoricPetProps) => {
    if (!type)
        throw new Error(
            'useGetMedicalRecordsByType: type must be a valid MEDICAL_RECORDS',
        )

    const { pet } = useSelectedPet()

    const { data, error, isPending } = useGetMedicalRecordsByPet({
        id_pet: pet?.id as string,
        cpf_cnpj: pet?.main_responsible_guardian?.cpf_cnpj as string,
    })

    const body_evolution = useMemo(
        () => data?.list_well_being?.body_evolution,
        [data?.list_well_being?.body_evolution],
    )

    const list_dental_procedures = useMemo(
        () => data?.list_dental_procedures,
        [data?.list_dental_procedures],
    )

    const exams = useMemo(() => data?.list_exams_tests, [data?.list_exams_tests])

    const physical_activities = useMemo(
        () => data?.list_well_being?.physical_activities,
        [data?.list_well_being?.physical_activities],
    )

    const hospitalizations = useMemo(
        () => data?.list_hospital_information?.hospitalizations,
        [data?.list_hospital_information?.hospitalizations],
    )
    const surgeries = useMemo(
        () => data?.list_hospital_information?.surgeries,
        [data?.list_hospital_information?.surgeries],
    )
    const diseases = useMemo(
        () => data?.list_hospital_information?.diseases,
        [data?.list_hospital_information?.diseases],
    )

    const injuries = useMemo(
        () => data?.list_hospital_information?.injuries,
        [data?.list_hospital_information?.injuries],
    )
    const internment = useMemo(
        () => data?.list_hospital_information?.internment,
        [data?.list_hospital_information?.internment],
    )
    const allergies = useMemo(
        () => data?.list_hospital_information?.allergies,
        [data?.list_hospital_information?.allergies],
    )
    const medicines = useMemo(() => data?.list_medicines, [data?.list_medicines])
    const vaccines = useMemo(() => data?.list_vaccines, [data?.list_vaccines])
    const nutritions = useMemo(() => data?.list_nutritions, [data?.list_nutritions])

    const medicalRecordsByType = useMemo(() => {
        switch (type) {
            case MEDICAL_RECORDS.ALLERGIES:
                return allergies
            case MEDICAL_RECORDS.BODY_EVOLUTION:
                return body_evolution
            case MEDICAL_RECORDS.DENTAL_PROCEDURES:
                return list_dental_procedures
            case MEDICAL_RECORDS.DISEASES:
                return diseases
            case MEDICAL_RECORDS.EXAMS:
                return exams
            case MEDICAL_RECORDS.HOSPITALIZATIONS:
                return hospitalizations
            case MEDICAL_RECORDS.INJURIES:
                return injuries
            case MEDICAL_RECORDS.INTERNMENTS:
                return internment
            case MEDICAL_RECORDS.MEDICINES:
                return medicines
            case MEDICAL_RECORDS.NUTRITIONS:
                return nutritions
            case MEDICAL_RECORDS.PHYSICAL_ACTIVITIES:
                return physical_activities
            case MEDICAL_RECORDS.SURGERIES:
                return surgeries
            case MEDICAL_RECORDS.VACCINES:
                return vaccines
        }
    }, [
        allergies,
        body_evolution,
        diseases,
        exams,
        hospitalizations,
        injuries,
        internment,
        medicines,
        nutritions,
        physical_activities,
        surgeries,
        vaccines,
        type,
    ])

    const options = useMemo(() => {
        return DataMedicalRecord?.[type]
    }, [type])

    return {
        data: medicalRecordsByType,
        error,
        isPending,
        title: options?.title,
        CardItem: options?.CardItem,
        FormModal: options?.FormModal,
    }
}
