import { useFormikContext } from 'formik'
import BoxButtons from '~/Components/molecules/box-buttons'
import { Gender } from '~/store/slices/pets/speciesType'
import { InitialValues, StepProps } from '../../types'

type Key = keyof typeof Gender


const StepListGender = ({
    previousStep
}: StepProps) => {

    const { values, setFieldValue } = useFormikContext<InitialValues>()

    const handleSelected = (gender: string) => {
        setFieldValue('gender', gender)
    }

    return (
        <div className="mt-3 p-1 gap-2">
            <div className="pb-1 max-h-[250px] overflow-auto">
                {
                    Object.keys(Gender).map(
                        (gender) => (
                            <button
                                key={gender}
                                type="button"
                                onClick={handleSelected.bind(null, gender)}
                                className="
                            group w-full flex items-center justify-center 
                            rounded-md px-2 py-2 text-sm gap-2 
                            hover:bg-primary-500 dark:hover:!bg-primary-600 hover:text-white
                        "
                            >
                                <div className="grid grid-cols-4 justify-center items-center">
                                    <span className="align-middle col-span-full">
                                        {Gender[gender as Key]}
                                    </span>
                                </div>
                            </button>
                        )
                    )
                }
            </div>

            <BoxButtons
                isValid={!!values.species}
                link={false}
                onClickCancel={previousStep}
                success={null}
            />

        </div>
    )
}

export default StepListGender