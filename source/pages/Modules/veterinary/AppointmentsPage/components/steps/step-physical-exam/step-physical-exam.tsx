import FieldControl from '~/Components/molecules/field-control/field-control'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import CardSimplePet from '../../molecules/card-simple-pet'
import type { CtxStepAnamnese } from '../../validations.yup'
import { screen } from '../styles'

const StepPhysicalExam = () => {
    const { values } = useFormikContextSafe<CtxStepAnamnese>()

    return (
        <>
            <CardSimplePet />
            <h4 className="font-sans text-base font-semibold text-center capitalize">
                Exame Físico
            </h4>
            <div className={screen({ className: 'px-1 w-full overflow-y-hidden' })}>
                <FieldControl
                    ctx={values}
                    name="exams_anamnesis.physical_exam.behavior"
                    label="Comportamento"
                />

                <FieldControl
                    ctx={values}
                    name="exams_anamnesis.physical_exam.body_state"
                    label="Estado Corporal"
                />

                <FieldControl
                    ctx={values}
                    name="exams_anamnesis.physical_exam.diet"
                    label="Dieta"
                />

                <FieldControl
                    ctx={values}
                    name="exams_anamnesis.physical_exam.fr"
                    label="Frequência Respiratória"
                />

                <FieldControl
                    ctx={values}
                    name="exams_anamnesis.physical_exam.fc"
                    label="Frequência Cardíaca"
                />

                <FieldControl
                    ctx={values}
                    name="exams_anamnesis.physical_exam.hydration"
                    label="Hidratação"
                />

                <FieldControl
                    ctx={values}
                    name="exams_anamnesis.physical_exam.mucous_membranes"
                    label="Membranas Mucosas"
                />

                <FieldControl
                    ctx={values}
                    name="exams_anamnesis.physical_exam.pa"
                    label="Temperatura"
                />

                <FieldControl
                    ctx={values}
                    name="exams_anamnesis.physical_exam.tpc"
                    label="Tensão Arterial"
                />
            </div>
        </>
    )
}

export default StepPhysicalExam
