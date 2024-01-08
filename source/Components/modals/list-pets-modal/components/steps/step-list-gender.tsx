import BoxButtons from '~/Components/molecules/box-buttons'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { Gender, GenderBR } from '~/store/slices/pets/speciesType'
import { CtxSimplifiedPedFields, StepProps } from '../../types'
import { option } from '../helpers'

type Key = keyof typeof Gender

const StepListGender = ({
    previousStep,
    nextStep
}: StepProps) => {

    const { values, setFieldValue } = useFormikContextSafe<CtxSimplifiedPedFields>()

    const handleSelected = (gender: string) => {
        setFieldValue('sex', gender)
        nextStep()
    }

    return (
        <div className="mt-3 p-1 gap-2">
            <div className="pb-1 h-[calc(100vh-20rem)] overflow-auto">
                {
                    Object.keys(Gender).map(
                        (gender) => (
                            <button
                                key={gender}
                                type="button"
                                onClick={handleSelected.bind(null, gender)}
                                className={option({ selected: values.sex === gender })}
                            >
                                <div className="grid grid-cols-4 justify-center items-center">
                                    <span className="align-middle col-span-full">
                                        {GenderBR[gender as Key]}
                                    </span>
                                </div>
                            </button>
                        )
                    )
                }
            </div>

            <BoxButtons
                isValid={!!values.sex}
                link={false}
                onClickCancel={previousStep}
                onClickSuccess={nextStep}
            />

        </div>
    )
}

export default StepListGender