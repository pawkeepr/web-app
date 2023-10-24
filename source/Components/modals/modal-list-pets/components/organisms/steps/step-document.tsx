import { cnpj, cpf } from 'cpf-cnpj-validator'
import { useFormikContext } from 'formik'
import { useMemo } from 'react'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import FieldDocument from '~/Components/molecules/field-document'
import { InitialValues } from '../../../modal-list-pets'

type SpetDocumentProps = {
    handleCancel: () => void
    onChangeSelectedTab: (index: number) => void
    selectedTab: number
}

const StepDocument = ({
    handleCancel,
    onChangeSelectedTab,
    selectedTab
}: SpetDocumentProps) => {

    const { values } = useFormikContext<InitialValues>()

    const nextStep = () => {
        onChangeSelectedTab(selectedTab + 1)
    }

    const validateDocument = useMemo(() => {
        return cpf.isValid(values.document) || cnpj.isValid(values.document)
    }, [values.document])

    return (
        <div className="mt-3 p-1 gap-2">

            <FieldDocument
                name="document"
                className="  w-full flex-1 mt-2"
                placeholder="CPF/CNPJ"
            />

            <BoxButtons
                isValid={validateDocument}
                link={false}
                onClickCancel={handleCancel}
                onClickSuccess={nextStep}
            />

        </div>
    )
}

export default StepDocument