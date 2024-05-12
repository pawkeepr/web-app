import { useMemo } from 'react'
import { BtnNeutral, BtnPrimary } from '~/Components/atoms/btn'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { StepProps } from './types'

const StepSchedule = ({ nextStep, prevStep }: StepProps) => {
    const { values, setFieldValue } = useFormikContextSafe()

    const requiredValid = useMemo((): boolean => {
        const isValid = true

        return isValid
    }, [])

    return (
        <div className="flex flex-row flex-wrap w-full">
            <div className="mt-1 gap-2 flex justify-center items-center w-full">
                <BtnNeutral
                    outline
                    className="border-none"
                    onClick={prevStep}
                    label="Voltar"
                />
                <BtnPrimary
                    onClick={nextStep}
                    disabled={!requiredValid}
                    label="Próximo"
                />
            </div>
        </div>
    )
}

export default StepSchedule
