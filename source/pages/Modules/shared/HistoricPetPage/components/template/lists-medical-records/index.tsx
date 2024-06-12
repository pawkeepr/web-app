import withControl from '~/Components/helpers/with-control'
import Accordion from '~/Components/molecules/accordion'
import type { PetMedicalRecords } from '~/types/medical-records'
import AllergiesItem from './allergies-item'
import BodyEvolutionItem from './body-evolution-item'
import DentalProcedure from './dental-procedures'
import DiseaseItem from './diseases-item'
import ExamItem from './exam-item'
import HospitalizationsItem from './hospitalizations-item'
import InjuriesItem from './injuries-item'
import MedicationsItem from './medications-item'
import NutritionItem from './nutritions-item'
import PhysicalActivityItem from './physical-activity-item'
import { itemStyle } from './styles'
import SurgeriesItem from './surgeries-item'
import VaccineItem from './vaccines-item'

type ListMedicalRecordsProps = {
    data?: PetMedicalRecords
}

const classNames = {
    title: 'text-base font-bold text-gray-600',
    content: 'text-gray-500 text-sm',
}

const ListMedicalRecords = ({ data }: ListMedicalRecordsProps) => {
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
        <article className="gap-2 p-2 font-sans text-xs bg-white">
            <Accordion title="Evolução Corporal" classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    {body_evolution?.map((item) => (
                        <BodyEvolutionItem key={item.id as string} item={item} />
                    ))}
                </ul>
            </Accordion>

            <Accordion title="Procedimentos Dentários" classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    {list_dental_procedures?.map((item) => (
                        <DentalProcedure item={item} key={item.id as string} />
                    ))}
                </ul>
            </Accordion>

            <Accordion title="Exames e Testes" classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    {exams?.map((item) => (
                        <ExamItem key={item.id as string} item={item} />
                    ))}
                </ul>
            </Accordion>

            <Accordion title="Atividade Física" classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    {physical_activities?.map((item) => (
                        <PhysicalActivityItem key={item.id as string} item={item} />
                    ))}
                </ul>
            </Accordion>

            <Accordion title="Hospitalizações" classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    {hospitalizations?.map((item) => (
                        <HospitalizationsItem key={item.id as string} item={item} />
                    ))}
                </ul>
            </Accordion>

            <Accordion title="Doenças" classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    {diseases?.map((item) => (
                        <DiseaseItem key={item.id as string} item={item} />
                    ))}
                </ul>
            </Accordion>

            <Accordion title="Alergias" classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    {allergies?.map((item) => (
                        <AllergiesItem key={item.id as string} item={item} />
                    ))}
                </ul>
            </Accordion>

            <Accordion title="Internações" classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    {internment?.map((item) => (
                        <HospitalizationsItem key={item.id as string} item={item} />
                    ))}
                </ul>
            </Accordion>

            <Accordion title="Cirurgias" classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    {surgeries?.map((item) => (
                        <SurgeriesItem key={item.id as string} item={item} />
                    ))}
                </ul>
            </Accordion>

            <Accordion title="Lesões" classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    {injuries?.map((item) => (
                        <InjuriesItem key={item.id as string} item={item} />
                    ))}
                </ul>
            </Accordion>

            <Accordion title="Medicamentos" classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    {medicines?.map((item) => (
                        <MedicationsItem key={item.id as string} item={item} />
                    ))}
                </ul>
            </Accordion>

            <Accordion title="Vacinas" classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    {vaccines?.map((item) => (
                        <VaccineItem key={item.id as string} item={item} />
                    ))}
                </ul>
            </Accordion>

            <Accordion title="Nutrição" classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    {nutritions?.map((item) => (
                        <NutritionItem key={item.id as string} item={item} />
                    ))}
                </ul>
            </Accordion>
        </article>
    )
}

export default withControl(ListMedicalRecords)
