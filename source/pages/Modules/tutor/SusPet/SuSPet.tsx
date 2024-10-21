import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { BsArrowLeftCircle, BsHospital, BsNutFill } from 'react-icons/bs'
import {
    FaAllergies,
    FaCut,
    FaHeartbeat,
    FaPills,
    FaSyringe,
    FaTooth,
    FaWeight,
} from 'react-icons/fa'
import { GiHealthNormal } from 'react-icons/gi'
import { IoIosFitness } from 'react-icons/io'
import { RiTestTubeFill } from 'react-icons/ri'
import {
    BodyEvolutionForm,
    DentalProcedureForm,
    DiseaseForm,
    ExamAndTestForm,
    HospitalizationForm,
    MedicineForm,
    NutritionForm,
    PhysicalActivityForm,
    TreatmentsForm,
    VaccinesForm,
} from '~/Components/forms/medical-records-form/forms'
import { CardButton } from './components/card-button'

const records = [
    {
        id: 1,
        form: BodyEvolutionForm,
        type: 'Evolução Corporal',
        icon: <FaWeight />,
        color: 'bg-blue-50',
        iconBg: 'bg-blue-100',
        textColor: 'text-blue-500',
    },
    {
        id: 2,
        form: TreatmentsForm,
        type: 'Cirurgias',
        icon: <FaCut />,
        color: 'bg-pink-50',
        iconBg: 'bg-pink-100',
        textColor: 'text-pink-500',
    },
    {
        id: 3,
        form: MedicineForm,
        type: 'Medicamentos',
        icon: <FaPills />,
        color: 'bg-purple-50',
        iconBg: 'bg-purple-100',
        textColor: 'text-purple-500',
    },
    {
        id: 4,
        form: DiseaseForm,
        type: 'Doenças',
        icon: <FaHeartbeat />,
        color: 'bg-red-50',
        iconBg: 'bg-red-100',
        textColor: 'text-red-500',
    },
    {
        id: 5,
        form: VaccinesForm,
        type: 'Vacinas',
        icon: <FaSyringe />,
        color: 'bg-green-50',
        iconBg: 'bg-green-100',
        textColor: 'text-green-500',
    },
    {
        id: 6,
        form: PhysicalActivityForm,
        type: 'Atividades Físicas',
        icon: <IoIosFitness />,
        color: 'bg-yellow-50',
        iconBg: 'bg-yellow-100',
        textColor: 'text-yellow-500',
    },
    {
        id: 7,
        form: DiseaseForm,
        type: 'Alergias',
        icon: <FaAllergies />,
        color: 'bg-orange-50',
        iconBg: 'bg-orange-100',
        textColor: 'text-orange-500',
    },
    {
        id: 8,
        form: DentalProcedureForm,
        type: 'Procedimentos Dentários',
        icon: <FaTooth />,
        color: 'bg-teal-50',
        iconBg: 'bg-teal-100',
        textColor: 'text-teal-500',
    },
    {
        id: 9,
        form: ExamAndTestForm,
        type: 'Exames',
        icon: <RiTestTubeFill />,
        color: 'bg-cyan-50',
        iconBg: 'bg-cyan-100',
        textColor: 'text-cyan-500',
    },
    {
        id: 10,
        form: HospitalizationForm,
        type: 'Hospitalizações',
        icon: <BsHospital />,
        color: 'bg-indigo-50',
        iconBg: 'bg-indigo-100',
        textColor: 'text-indigo-500',
    },
    {
        id: 11,
        form: HospitalizationForm,
        type: 'Internações',
        icon: <GiHealthNormal />,
        color: 'bg-lime-50',
        iconBg: 'bg-lime-100',
        textColor: 'text-lime-500',
    },
    {
        id: 12,
        form: DiseaseForm,
        type: 'Lesões',
        icon: <FaHeartbeat />,
        color: 'bg-red-50',
        iconBg: 'bg-red-100',
        textColor: 'text-red-500',
    },
    {
        id: 13,
        form: NutritionForm,
        type: 'Nutrição',
        icon: <BsNutFill />,
        color: 'bg-amber-50',
        iconBg: 'bg-amber-100',
        textColor: 'text-amber-500',
    },
]

const SuSPet = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const onChangeSelectedIndex = (index: number) => {
        setSelectedIndex(index)
    }

    return (
        <TabGroup
            className="bg-white"
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
        >
            <TabList as="aside">
                <Tab className="text-base font-semibold text-center text-gray-700 data-[selected]:hidden">
                    <Fade>
                        <span className="flex items-center justify-center gap-2 p-2 text-sm font-semibold text-center text-gray-700 h-fit ">
                            <BsArrowLeftCircle /> Voltar
                        </span>
                    </Fade>
                </Tab>

                {records.map((record) => (
                    <Tab key={record.id} className="hidden">
                        {record.type}
                    </Tab>
                ))}
            </TabList>
            <TabPanels as="section">
                <TabPanel className="flex flex-wrap items-center justify-start gap-4 px-4 pt-4 pb-[120px] ">
                    {records
                        .sort((a, b) => a.type.localeCompare(b.type))
                        .map((record, index) => (
                            <Fade key={record.id} delay={index * 25}>
                                <CardButton
                                    record={record}
                                    selectedIndex={selectedIndex}
                                    onChangeSelectedIndex={onChangeSelectedIndex}
                                />
                            </Fade>
                        ))}
                </TabPanel>
                {records.map((record) => (
                    <TabPanel key={record.type}>
                        <Fade>
                            <div className="flex flex-wrap items-center justify-start gap-4 px-4 pt-4 pb-[120px]">
                                {/* {
                                    <record.form
                                        item={
                                            {
                                                id: '',
                                                id_appointment: '',
                                                coin: 'BRL',
                                            } as MedicalRecordEntry
                                        }
                                        pet={{} as PetData}
                                        handleSubmit={() => null}
                                        key={record.type}
                                    />
                                } */}
                            </div>
                        </Fade>
                    </TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    )
}

export default SuSPet
