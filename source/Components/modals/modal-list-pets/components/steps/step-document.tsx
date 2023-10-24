import { cnpj, cpf } from 'cpf-cnpj-validator'
import { useFormikContext } from 'formik'
import { useMemo } from 'react'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import FieldDocument from '~/Components/molecules/field-document'
import { InitialValues, StepProps } from '../../types'



const StepDocument = ({
    nextStep,
}: StepProps) => {

    const { values } = useFormikContext<InitialValues>()

    const validateDocument = useMemo(() => {
        return cpf.isValid(values.document) || cnpj.isValid(values.document)
    }, [values.document])

    return (
        <div className="mt-3 p-1 gap-2 ">

            <FieldDocument
                required
                name="document"
                className="  w-full flex-1 mt-2"
                placeholder="CPF/CNPJ"
            />
            <BoxButtons
                isValid={validateDocument}
                link={false}
                cancel={null}
                onClickSuccess={nextStep}
            />
        </div>
    )
}

export default StepDocument