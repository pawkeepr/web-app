import {
    type MEDICAL_RECORDS,
    type MedicalRecordEntry,
    MedicalRecordOptions,
} from '~/types/medical-records'
import { option } from '../../modals/scheduled-v2-modal/components/helpers'

export type Option = {
    value: MEDICAL_RECORDS
    label: string
}

export type MedicalRecordFormProps = {
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

export default OptionsComponent
