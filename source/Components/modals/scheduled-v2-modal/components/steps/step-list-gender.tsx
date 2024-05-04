import { FaTransgenderAlt } from 'react-icons/fa'
import { IoMdFemale, IoMdMale } from 'react-icons/io'
import BoxButtons from '~/Components/molecules/box-buttons'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { Gender, GenderBR } from '~/types/speciesType'
import type { CtxSimplifiedPeTFields, StepProps } from '../../types'
import { option } from '../helpers'

type Key = keyof typeof Gender

const IconGender = {
    male: IoMdMale.bind(null, {
        className: 'text-blue-400 w-4 h-4  bottom-1 right-2',
    }),
    female: IoMdFemale.bind(null, {
        className: 'text-pink-400 w-4 h-4  bottom-1 right-2',
    }),
    unknown: FaTransgenderAlt.bind(null, {
        className: 'text-purple-400 w-4 h-4  bottom-1 right-2',
    }),
}

const StepListGender = ({ previousStep, nextStep }: StepProps) => {
    const { values, setFieldValue } = useFormikContextSafe<CtxSimplifiedPeTFields>()

    const handleSelected = (gender: string) => {
        setFieldValue('sex', gender)
        nextStep()
    }

    return (
        <div className="flex-1 flex mobile:h-[90vh] h-full w-full justify-between items-center flex-col">
            <div className="overflow-auto flex flex-1 gap-2 justify-center items-center flex-col w-full py-1">
                {Object.keys(Gender).map((gender) => {
                    const Icon = IconGender[gender as keyof typeof IconGender]

                    return (
                        <button
                            key={gender}
                            type="button"
                            onClick={handleSelected.bind(null, gender)}
                            className={option({ selected: values.sex === gender })}
                        >
                            <div className="flex justify-center gap-2 items-center w-full h-full">
                                <span>{<Icon />}</span>
                                <span>{GenderBR[gender as Key]}</span>
                            </div>
                        </button>
                    )
                })}
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
