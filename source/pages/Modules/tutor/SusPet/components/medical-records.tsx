import { format } from 'date-fns'
import { useMemo } from 'react'
import { FaPlus } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'
import { useSelectedPet } from '~/hooks/use-selected-pet'
import { itemStyle } from '~/pages/Modules/shared/HistoricPetPage/components/template/lists-medical-records/styles'
import { useHandleMedicalRecordsMutation } from '~/store/hooks/medical-records'
import useProfile from '~/store/hooks/profile/use-profile'
import type { MEDICAL_RECORDS, MedicalRecordEntry } from '~/types/medical-records'
import { NameProfile } from '~/types/profile'
import { useGetMedicalRecordsByType } from './hook'

export type HistoricPetProps = {
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

export const ItemsRecords = ({
    children,
    title,
    classNames = {},
}: ItemsRecordsProps) => {
    return (
        <section className="w-full ">
            <div className={twMerge('', classNames?.content)}>{children}</div>
        </section>
    )
}

export const classNames = {
    title: 'text-base font-bold text-gray-600 mb-2',
    content: 'text-gray-500 text-sm',
}

const MedicalRecord = ({ type }: HistoricPetProps) => {
    const { data, error, isPending, CardItem, FormModal, title } =
        useGetMedicalRecordsByType({
            type,
        })

    const { pet } = useSelectedPet()

    if (error || !type) return <div>Erro ao carregar prontuário</div>

    if (isPending) return <div>Carregando...</div>
    const { data: profile } = useProfile()

    const handleSubmitHelper = useHandleMedicalRecordsMutation({
        id_pet: pet?.id as string,
        name: type as MEDICAL_RECORDS,
        cpf_cnpj: pet?.main_responsible_guardian?.cpf_cnpj as string,
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

    return (
        <section className="relative gap-2 px-4 pb-4">
            <ItemsRecords title={title} classNames={classNames}>
                <ul className={itemStyle.ul()}>
                    <li>
                        <FormModal
                            handleSubmit={handleSubmit}
                            item={null}
                            handleClose={() => {}}
                        >
                            {(showModal) => {
                                return (
                                    <button
                                        onClick={showModal}
                                        type="button"
                                        className="flex items-center flex-grow p-6 text-base transition-opacity duration-300 ease-in-out bg-opacity-0 rounded-lg bg-primary-200 shrink hover:bg-opacity-100 "
                                    >
                                        <div className="p-2 rounded-full bg-primary-500">
                                            <FaPlus className="text-white" />
                                        </div>
                                        <div className="ml-4 text-start">
                                            <h2 className="font-bold text-gray-500">
                                                Adicionar Registro
                                            </h2>
                                        </div>
                                    </button>
                                )
                            }}
                        </FormModal>
                    </li>
                    <h1 className="w-full">
                        <span className={classNames?.title}>{title}</span>
                    </h1>
                    {data?.map((item) => (
                        <CardItem
                            key={item.id as string}
                            item={item}
                            document={document}
                            id_pet={pet?.id as string}
                        />
                    ))}
                </ul>
            </ItemsRecords>
        </section>
    )
}

export default MedicalRecord
