import withControl from '~/Components/helpers/with-control'
import type { MEDICAL_RECORDS } from '~/types/medical-records'

import type { FormikHelpers } from 'formik'
import { FaArrowLeft } from 'react-icons/fa'
import { BtnIcon } from '~/Components/atoms/btn'
import CardInputTreatment from '~/Components/organism/card-input-treatment'
import type { QuestionTreatment } from '~/types/appointment'

type MedicalRecordForm = {
    type: MEDICAL_RECORDS
    item: QuestionTreatment | null
    cpf_cnpj: string
    id_pet: string
    handleClose?: () => void
    onChangeIndex?: (index: number) => void
}

const TreatmentItemForm = ({
    type,
    handleSubmit: push,
    onChangeIndex: onChangeSelectedTab,
}: MedicalRecordForm & { handleSubmit: (data: QuestionTreatment) => unknown }) => {
    const onSubmit = async (
        item: QuestionTreatment,
        formikHelpers: FormikHelpers<unknown>,
    ) => {
        return new Promise(() => {
            push(item)
            formikHelpers.resetForm()
        })
    }

    return (
        <>
            <div className="absolute top-0 left-0 right-0 h-1">
                <BtnIcon
                    icon={<FaArrowLeft />}
                    type="button"
                    label="Voltar"
                    onClick={onChangeSelectedTab?.bind(null, 0)}
                    className="w-fit text-gray-400 hover:text-gray-600"
                />
            </div>

            <CardInputTreatment handleSubmit={onSubmit} type={type} />
        </>
    )
}

export default withControl(TreatmentItemForm)
