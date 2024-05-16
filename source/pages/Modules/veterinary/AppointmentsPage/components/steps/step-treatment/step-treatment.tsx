import { FieldArray } from 'formik'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaCapsules, FaFileMedical, FaSyringe, FaUtensils } from 'react-icons/fa'
import type { OptionSelect } from '~/Components/molecules/field-control'
import CardInputTreatment from '~/Components/organism/card-input-treatment'
import { MEDICAL_RECORDS } from '~/types/medical-records'
import CardSimplePet from '../../molecules/card-simple-pet'
import { screen } from '../styles'

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
        label: 'Exames/Testes',
        icon: FaFileMedical,
    },
    {
        value: MEDICAL_RECORDS.OTHERS,
        label: 'Outros',
        icon: BsThreeDotsVertical,
    },
]

const StepTreatment = () => {
    return (
        <>
            <CardSimplePet />
            <h4 className="font-sans text-base font-semibold text-center capitalize">
                Tratamento
            </h4>
            <div className={screen()}>
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
            </div>
        </>
    )
}

export default StepTreatment
