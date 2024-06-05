import { useFormikContext } from 'formik'
import IconSpecie from '~/Components/atoms/icon-specie'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import { useTranslations } from '~/hooks/use-translations'
import { species, type KeysIconPets } from '~/types/speciesType'
import type { InitialValues, StepProps } from '../../types'
import { option } from '../helpers'

const StepListSpecies = ({ nextStep, previousStep }: StepProps) => {
    const { setFieldValue, values } = useFormikContext<InitialValues>()
    const { t } = useTranslations('common')

    const handleSelectedSpecie = (specie: string) => {
        setFieldValue('specie', specie)
        nextStep()
    }

    return (
        <div className="flex-1 flex mobile:h-[90vh] h-[75vh] w-full  justify-between items-center flex-col">
            <div className="flex flex-col items-center justify-start flex-1 w-full gap-2 py-1 overflow-auto scroll ">
                {species.map((specie) => (
                    <button
                        key={specie.value}
                        type="button"
                        onClick={() => handleSelectedSpecie(specie.value)}
                        className={option({
                            selected: values.specie === specie.value,
                        })}
                    >
                        <div className="flex items-center justify-center w-full gap-2">
                            <span className="col-span-1 align-middle">
                                <IconSpecie specie={specie.value as KeysIconPets} />
                            </span>
                            <span className="col-span-2 align-middle">
                                {t(specie.label)}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
            <BoxButtons
                isValid={!!values.specie}
                link={false}
                onClickCancel={previousStep}
                onClickSuccess={nextStep}
            />
        </div>
    )
}

export default StepListSpecies
