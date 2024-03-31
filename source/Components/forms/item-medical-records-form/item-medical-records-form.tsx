import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { BtnIcon } from '~/Components/atoms/btn'

import type { MEDICAL_RECORDS, MedicalRecordEntry } from '~/types/medical-records'
import OptionsComponent, {
    type MedicalRecordFormProps,
    type Option,
} from '../../forms/item-medical-records-form/options-component'

type ItemMedicalRecordsFormProps = {
    cpf_cnpj: string
    id_pet: string
    item?: MedicalRecordEntry | null
    handleCancel: () => void
    form: (props: MedicalRecordFormProps) => JSX.Element
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
    cpf_cnpj,
    id_pet,
    handleCancel,
    form: FormComponent,
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

    const STEPS = useMemo(() => makeSteps(FormComponent), [FormComponent])

    return (
        <>
            {selectedTab > 0 && (
                <div className="absolute top-0 left-0 right-0 h-1">
                    <BtnIcon
                        icon={<FaArrowLeft />}
                        type="button"
                        label="Voltar"
                        onClick={onChangeSelectedTab?.bind(null, 0)}
                        className="w-fit text-gray-400 hover:text-gray-600"
                    />
                </div>
            )}
            <section className="flex flex-1 relative flex-col">
                <Tab.Group
                    selectedIndex={selectedTab}
                    onChange={onChangeSelectedTab}
                >
                    <Tab.List className="flex flex-row w-full justify-between">
                        {STEPS.map((item) => (
                            <Tab key={item.id} className="hidden" />
                        ))}
                    </Tab.List>
                    <div className="flex flex-row w-full justify-between">
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

                    <Tab.Panels className="w-full h-full relative ">
                        {STEPS.map((Step) => (
                            <Tab.Panel key={Step.id}>
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
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </section>
        </>
    )
}

export default ItemMedicalRecordsForm
