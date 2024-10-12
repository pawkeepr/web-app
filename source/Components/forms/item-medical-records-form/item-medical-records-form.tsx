import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import cn from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { BtnIcon } from '~/Components/atoms/btn'

import MedicalRecordsForm from '~/Components/forms/medical-records-form'
import type { MEDICAL_RECORDS, MedicalRecordEntry } from '~/types/medical-records'
import type { PetData } from '~/types/pet-v2'
import OptionsComponent, {
    type MedicalRecordFormProps,
    type Option,
} from '../../forms/item-medical-records-form/options-component'
type ItemMedicalRecordsFormProps = {
    cpf_cnpj: string
    id_pet: string
    pet: PetData | null
    item?: MedicalRecordEntry | null
    handleCancel: () => void
}

export const NUMBER_STEPS = {
    OPTIONS: 0,
    MEDICAL_RECORDS: 1,
} as const
export type NumberSteps = (typeof NUMBER_STEPS)[keyof typeof NUMBER_STEPS]

const makeSteps = (
    FormComponent: (props: MedicalRecordFormProps) => JSX.Element,
) => [
    {
        id: NUMBER_STEPS.OPTIONS,
        title: 'Opções',
        component: (props: MedicalRecordFormProps) => (
            <OptionsComponent {...props} />
        ),
    },
    {
        id: NUMBER_STEPS.MEDICAL_RECORDS,
        title: 'Prontuário',
        component: FormComponent,
    },
]

const ItemMedicalRecordsForm = ({
    item,
    pet,
    cpf_cnpj,
    id_pet,
    handleCancel,
}: ItemMedicalRecordsFormProps) => {
    const [selectedTab, setSelectedTab] = useState(0)

    const [type, setType] = useState<Option | null>(null)
    const onChangeSelectedTab = (index: number) => {
        setSelectedTab(index)
    }

    useEffect(() => {
        return () => {
            setSelectedTab(0)
        }
    }, [])

    const onChangeType = (type: Option) => {
        setType(type)
        setSelectedTab(NUMBER_STEPS.MEDICAL_RECORDS)
    }

    const STEPS = useMemo(
        () =>
            makeSteps(() => (
                <MedicalRecordsForm
                    pet={pet}
                    cpf_cnpj={cpf_cnpj}
                    id_pet={id_pet}
                    type={type?.value as MEDICAL_RECORDS}
                    item={item as MedicalRecordEntry}
                    onChangeIndex={onChangeSelectedTab}
                />
            )),
        [item, type, pet, cpf_cnpj, id_pet],
    )

    return (
        <>
            {selectedTab > 0 && (
                <div className="absolute top-0 left-0 right-0 h-1">
                    <BtnIcon
                        icon={<FaArrowLeft />}
                        type="button"
                        label="Voltar"
                        onClick={onChangeSelectedTab?.bind(null, 0)}
                        className="text-gray-400 w-fit hover:text-gray-600"
                    />
                </div>
            )}
            <section className="relative flex flex-col flex-1">
                <TabGroup
                    selectedIndex={selectedTab}
                    onChange={onChangeSelectedTab}
                >
                    <TabList className="flex flex-row justify-between w-full">
                        {STEPS.map((item) => (
                            <Tab key={item.id} className="hidden" />
                        ))}
                    </TabList>
                    <div className="flex flex-row justify-between w-full">
                        {STEPS.slice(1, STEPS.length - 2).map((item) => (
                            <div
                                key={item.id}
                                className={cn(
                                    'p-2 text-center uppercase bg-opacity-10 bg-primary-500 flex-1 w-full',
                                    {
                                        'text-primary-500': selectedTab === item.id,
                                        'text-gray-400': selectedTab !== item.id,
                                    },
                                )}
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>

                    <TabPanels className="relative w-full h-full ">
                        {STEPS.map((Step) => (
                            <TabPanel key={Step.id}>
                                <Step.component
                                    condition={!!type}
                                    type={type?.value as MEDICAL_RECORDS}
                                    onChange={onChangeType}
                                    item={item as MedicalRecordEntry}
                                    cpf_cnpj={cpf_cnpj}
                                    id_pet={id_pet}
                                    handleClose={handleCancel}
                                    onChangeIndex={onChangeSelectedTab}
                                />
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
            </section>
        </>
    )
}

export default ItemMedicalRecordsForm
