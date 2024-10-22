import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { BsArrowLeftCircle, BsHospital } from 'react-icons/bs'
import {
    FaAllergies,
    FaAppleAlt,
    FaBandAid,
    FaCut,
    FaHeartbeat,
    FaPills,
    FaRunning,
    FaSyringe,
    FaTooth,
    FaWeight,
} from 'react-icons/fa'
import { RiTestTubeFill } from 'react-icons/ri'
import { useSelectedPet } from '~/hooks/use-selected-pet'
import { useGetMedicalRecordsByPet } from '~/store/hooks/medical-records'
import { MEDICAL_RECORDS } from '~/types/medical-records'
import { CardButton } from './components/card-button'
import MedicalRecord from './components/medical-records'
import WarningNoHaveSelectPet from './components/warning-no-have-select-pet'

const records = [
    {
        id: 1,
        key: MEDICAL_RECORDS.BODY_EVOLUTION,
        type: 'Evolução Corporal',
        icon: <FaWeight />,
        color: 'bg-blue-100',
        iconBg: 'bg-blue-200',
        textColor: 'text-blue-500',
    },
    {
        id: 2,
        key: MEDICAL_RECORDS.SURGERIES,
        type: 'Cirurgias',
        icon: <FaCut />,
        color: 'bg-pink-100',
        iconBg: 'bg-pink-200',
        textColor: 'text-pink-500',
    },
    {
        id: 3,
        key: MEDICAL_RECORDS.MEDICINES,
        type: 'Medicamentos',
        icon: <FaPills />,
        color: 'bg-purple-100',
        iconBg: 'bg-purple-200',
        textColor: 'text-purple-500',
    },
    {
        id: 4,
        key: MEDICAL_RECORDS.DISEASES,
        type: 'Doenças',
        icon: <FaHeartbeat />,
        color: 'bg-red-100',
        iconBg: 'bg-red-200',
        textColor: 'text-red-500',
    },
    {
        id: 5,
        key: MEDICAL_RECORDS.VACCINES,
        type: 'Vacinas',
        icon: <FaSyringe />,
        color: 'bg-green-100',
        iconBg: 'bg-green-200',
        textColor: 'text-green-500',
    },
    {
        id: 6,
        key: MEDICAL_RECORDS.PHYSICAL_ACTIVITIES,
        type: 'Atividades Físicas',
        icon: <FaRunning />,
        color: 'bg-yellow-100',
        iconBg: 'bg-yellow-200',
        textColor: 'text-yellow-500',
    },
    {
        id: 7,
        key: MEDICAL_RECORDS.ALLERGIES,
        type: 'Alergias',
        icon: <FaAllergies />,
        color: 'bg-orange-100',
        iconBg: 'bg-orange-200',
        textColor: 'text-orange-500',
    },
    {
        id: 8,
        key: MEDICAL_RECORDS.DENTAL_PROCEDURES,
        type: 'Procedimentos Dentários',
        icon: <FaTooth />,
        color: 'bg-teal-100',
        iconBg: 'bg-teal-200',
        textColor: 'text-teal-500',
    },
    {
        id: 9,
        key: MEDICAL_RECORDS.EXAMS,
        type: 'Exames',
        icon: <RiTestTubeFill />,
        color: 'bg-cyan-100',
        iconBg: 'bg-cyan-200',
        textColor: 'text-cyan-500',
    },
    {
        id: 10,
        key: MEDICAL_RECORDS.HOSPITALIZATIONS,
        type: 'Hospitalizações',
        icon: <BsHospital />,
        color: 'bg-indigo-100',
        iconBg: 'bg-indigo-200',
        textColor: 'text-indigo-500',
    },
    {
        id: 11,
        key: MEDICAL_RECORDS.INTERNMENTS,
        type: 'Internações',
        icon: <BsHospital />,
        color: 'bg-lime-100',
        iconBg: 'bg-lime-200',
        textColor: 'text-lime-500',
    },
    {
        id: 12,
        key: MEDICAL_RECORDS.INJURIES,
        type: 'Lesões',
        icon: <FaBandAid />,
        color: 'bg-red-100',
        iconBg: 'bg-red-200',
        textColor: 'text-red-500',
    },
    {
        id: 13,
        key: MEDICAL_RECORDS.NUTRITIONS,
        type: 'Nutrição',
        icon: <FaAppleAlt />,
        color: 'bg-amber-100',
        iconBg: 'bg-amber-200',
        textColor: 'text-amber-500',
    },
]

const SuSPet = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { pet } = useSelectedPet()

    const { data, isPending } = useGetMedicalRecordsByPet({
        id_pet: pet?.id as string,
        cpf_cnpj: pet?.main_responsible_guardian?.cpf_cnpj as string,
    })

    const onChangeSelectedIndex = (index: number) => {
        setSelectedIndex(index)
    }

    return (
        <TabGroup
            className="mb-4 bg-white rounded-lg shadow-lg"
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
        >
            <TabList as="aside">
                <ul className="flex flex-col">
                    <Tab
                        as="li"
                        aria-label="Voltar à tela anterior"
                        className="text-base cursor-pointer font-semibold text-center text-gray-700 data-[selected]:hidden"
                    >
                        <Fade>
                            <span className="flex items-center justify-center gap-2 p-2 m-2 text-sm font-semibold text-center text-gray-700 h-fit w-fit ">
                                <BsArrowLeftCircle /> Voltar
                            </span>
                        </Fade>
                    </Tab>

                    {records.map((record, index) => (
                        <Tab
                            as="li"
                            key={record.id}
                            className="hidden"
                            aria-controls={`panel-${record.id}`}
                            aria-selected={
                                selectedIndex === index ? 'true' : 'false'
                            }
                        >
                            {record.type}
                        </Tab>
                    ))}
                </ul>
            </TabList>
            <TabPanels as="section" className="relative z-0">
                <WarningNoHaveSelectPet
                    isPending={isPending && !!pet?.id}
                    condition={!data?.id}
                />
                <TabPanel
                    as="ul"
                    className="flex flex-wrap items-center justify-start gap-4 px-4 pt-4 pb-[120px] z-0 "
                >
                    {records.map((record, index) => (
                        <Fade key={record.id} delay={index * 25}>
                            <li>
                                <span className="sr-only">{record.type}</span>
                                <CardButton
                                    i18nIsDynamicList
                                    disabled={!pet?.id}
                                    record={record}
                                    selectedIndex={selectedIndex}
                                    onChangeSelectedIndex={onChangeSelectedIndex}
                                />
                            </li>
                        </Fade>
                    ))}
                </TabPanel>
                {records.map((record) => (
                    <TabPanel
                        key={record.type}
                        aria-live="polite"
                        tabIndex={0}
                        aria-labelledby={`tab-${record.id}`}
                    >
                        <Fade>
                            <MedicalRecord
                                id_pet={pet?.id as string}
                                document={
                                    pet?.main_responsible_guardian
                                        ?.cpf_cnpj as string
                                }
                                type={record.key}
                            />
                        </Fade>
                    </TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    )
}

export default SuSPet
