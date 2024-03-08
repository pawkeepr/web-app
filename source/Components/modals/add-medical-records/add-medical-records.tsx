import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { useState } from 'react'
import { FaArrowLeft, FaPlus } from 'react-icons/fa'
import { BtnIcon } from '~/Components/atoms/btn'
import MedicalRecordsForm from '~/Components/forms/medical-records-form'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'

import {
    MedicalRecordOptions,
    type MEDICAL_RECORDS,
    type MedicalRecordEntry,
} from '~/types/medical-records'
import { option } from '../scheduled-v2-modal/components/helpers'

type AddModalProps = {
    children?: (showModal: () => void) => JSX.Element
    cpf_cnpj: string
    id_pet: string
    item?: MedicalRecordEntry | null
}

type Option = {
    value: MEDICAL_RECORDS
    label: string
}

export const NUMBER_STEPS = {
    OPTIONS: 0,
    MEDICAL_RECORDS: 1,
} as const
export type NumberSteps = (typeof NUMBER_STEPS)[keyof typeof NUMBER_STEPS]

type MedicalRecordFormProps = {
    type: MEDICAL_RECORDS
    item: MedicalRecordEntry | null
    cpf_cnpj: string
    id_pet: string
    condition?: boolean
    handleClose?: () => void
    onChange: (type: Option) => void
    onChangeIndex?: (index: number) => void
}

const OptionsComponent = ({ onChange }: MedicalRecordFormProps) => {
    return (
        <div className="grid grid-cols-2 mobile:grid-cols-1">
            {MedicalRecordOptions?.map((item, index) => (
                <button
                    key={`${item.value}-${index}`}
                    type="button"
                    onClick={onChange.bind(null, item)}
                    className={option()}
                >
                    <div className="flex flex-1 justify-center gap-2">
                        <div className="w-60 flex flex-row gap-2 justify-center items-center">
                            <span className="flex-1  items-center justify-center">
                                <item.icon />
                            </span>
                            <span className=" flex-[2] items-center justify-center">
                                {item.label}
                            </span>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    )
}

const STEPS = [
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
        component: (props: MedicalRecordFormProps) => (
            <MedicalRecordsForm {...props} />
        ),
    },
]

const AddMedicalRecordsModal = ({
    children,
    item = null,
    cpf_cnpj,
    id_pet,
}: AddModalProps) => {
    const [selectedTab, setSelectedTab] = useState(0)

    const [type, setType] = useState<Option | null>(null)

    const { closeModal, open, showModal } = useModal()

    const onChangeSelectedTab = (index: number) => {
        setSelectedTab(index)
    }

    const title = item ? 'Editar Registro Médico' : 'Adicionar Registro Médico'

    const onChangeType = (type: Option) => {
        setType(type)
        setSelectedTab(NUMBER_STEPS.MEDICAL_RECORDS)
    }

    return (
        <>
            {children?.(showModal) || (
                <BtnIcon
                    icon={<FaPlus />}
                    type="button"
                    onClick={showModal}
                    className={cn(
                        `
                        web:w-fit web:p-1 web:m-0 web:h-fit  mobile:w-full
                        web:text-gray-400 web:border-none bg-confirm-500 hover:bg-confirm-600 text-white
                    `,
                    )}
                    label="Adicionar Registro Médico"
                />
            )}
            <Modal
                onOpen={() => {
                    setType(null)
                    setSelectedTab(0)
                    showModal()
                }}
                onClose={() => closeModal()}
                modal
                nested
                open={open}
                lockScroll
                className="pb-0 w-[750px] h-fit py-4 min-h-96"
            >
                <div className="w-full">
                    <h6 className="mb-4 font-semibold text-center uppercase">
                        {title}
                    </h6>
                </div>

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
                                            'text-primary-500':
                                                selectedTab === item.id,
                                            'text-gray-400':
                                                selectedTab !== item.id,
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
                                        item={item}
                                        cpf_cnpj={cpf_cnpj}
                                        id_pet={id_pet}
                                        handleClose={closeModal}
                                        onChangeIndex={onChangeSelectedTab}
                                    />
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                </section>
            </Modal>
        </>
    )
}

export default AddMedicalRecordsModal
