import { FieldArray } from 'formik'
import {
    FaCapsules,
    FaFileMedical,
    FaRunning,
    FaSyringe,
    FaUtensils,
} from 'react-icons/fa'
import type { OptionSelect } from '~/Components/molecules/field-control'
import CardInputTreatment from '~/Components/organism/card-input-treatment'
import { MEDICAL_RECORDS } from '~/types/medical-records'
import CardSimplePet from '../../../molecules/card-simple-pet'

const items: OptionSelect[] = [
    {
        value: MEDICAL_RECORDS.MEDICINES,
        label: 'Medicamentos',
        icon: FaCapsules,
    },
    {
        value: MEDICAL_RECORDS.VACCINES,
        label: 'Vacinas',
        icon: FaSyringe,
    },
    {
        value: MEDICAL_RECORDS.NUTRITIONS,
        label: 'Alimentação',
        icon: FaUtensils,
    },
    {
        value: MEDICAL_RECORDS.EXAMS,
        label: 'Exames',
        icon: FaFileMedical,
    },
    {
        value: MEDICAL_RECORDS.PHYSICAL_ACTIVITIES,
        label: 'Atividades Físicas',
        icon: FaRunning,
    },
]

const StepTreatment = () => {
    return (
        <section>
            <CardSimplePet />
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Tratamento
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>
            <FieldArray name="treatments.questions_treatment">
                {({ push, remove }) => (
                    <CardInputTreatment
                        items={items}
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
        </section>
    )
}

export default StepTreatment
