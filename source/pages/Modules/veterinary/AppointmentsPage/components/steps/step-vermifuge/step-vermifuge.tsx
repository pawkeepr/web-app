import { FieldArray } from 'formik'
import { FaUtensils } from 'react-icons/fa'
import type { OptionSelect } from '~/Components/molecules/field-control'
import CardInputTreatment from '~/Components/organism/card-input-treatment'
import { MEDICAL_RECORDS } from '~/types/medical-records'
import CardSimplePet from '../../molecules/card-simple-pet'
import { screen } from '../styles'

const category: OptionSelect = {
    value: MEDICAL_RECORDS.NUTRITIONS,
    label: 'Alimentação',
    icon: FaUtensils,
}

const StepSupplementation = () => {
    return (
        <>
            <CardSimplePet />
            <h4 className="font-sans text-base font-semibold text-center capitalize">
                Alimentação e Suplementação
            </h4>
            <div className={screen()}>
                <FieldArray name="treatments.questions_treatment">
                    {({ push, remove }) => (
                        <CardInputTreatment
                            category={category}
                            handleRemove={(index) => remove(index)}
                            handleSubmit={(data, formikHelpers) => {
                                return new Promise(() => {
                                    push(data)
                                    formikHelpers.resetForm()
                                })
                            }}
                        />
                    )}
                </FieldArray>
            </div>
        </>
    )
}

export default StepSupplementation
