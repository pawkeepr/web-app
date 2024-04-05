import FieldArraySafe from '~/Components/molecules/field-array-safe'
import FieldTextArea from '~/Components/molecules/field-text-area'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import CardSimplePet from '../../../molecules/card-simple-pet'
import type { CtxStepAnamnese } from '../../../validations.yup'

const TRADUCTION = {
    yes: 'Sim',
    no: 'Não',
}

const StepDiagnosis = () => {
    const { values } = useFormikContextSafe<CtxStepAnamnese>()

    return (
        <>
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Pré-Anamnese
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>
            <div
                className="
                flex-col card shadow-2xl p-8 
                border-secondary-500 border relative
                mobile:p-2 mobile:border  mobile:!shadow-none
                min-h-[420px]  rounded-sm
                grid grid-cols-12 mobile:grid-cols-1
            "
            >
                <div className="w-full col-span-full">
                    <CardSimplePet />
                </div>
                <section className="col-span-full flex flex-1 w-full flex-col gap-1">
                    <FieldArraySafe
                        ctx={values}
                        name="anamnesis.questions_anamnesis"
                    >
                        {({ remove }) =>
                            values.anamnesis?.questions_anamnesis?.map(
                                (anamnesis, index) => (
                                    <div
                                        key={`anamnesis-${index}`}
                                        className="w-full bg-secondary rounded-md text-xs py-1 px-2"
                                    >
                                        <div className="w-full flex flex-row bg-secondary px-2 rounded-sm border-dashed border border-primary">
                                            <div className="flex flex-wrap w-full">
                                                <h6 className="flex-[2] font-mono font-semibold  capitalize">
                                                    {anamnesis.name_anamnesis}
                                                </h6>

                                                <p className="flex-1 font-mono capitalize">
                                                    {
                                                        TRADUCTION[
                                                            anamnesis.options_anamnesis as
                                                                | 'yes'
                                                                | 'no'
                                                        ]
                                                    }
                                                </p>
                                                <button
                                                    type="button"
                                                    className="text-red-500"
                                                    onClick={() => remove(index)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ),
                            )
                        }
                    </FieldArraySafe>
                </section>
                <FieldTextArea
                    isValid={values.anamnesis.note.length > 0}
                    ctx={values}
                    label="Diagnóstico"
                    required
                    name="anamnesis.note"
                    divClassName="col-span-full"
                />
            </div>
        </>
    )
}

export default StepDiagnosis
