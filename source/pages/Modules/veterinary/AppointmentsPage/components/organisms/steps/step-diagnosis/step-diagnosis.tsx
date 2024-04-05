import ModalConfirm from '~/Components/modals/confirm-modal/modal-confirm'
import FieldArraySafe from '~/Components/molecules/field-array-safe'
import FieldTextArea from '~/Components/molecules/field-text-area'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import CardSimplePet from '../../../molecules/card-simple-pet'
import type { CtxStepAnamnese } from '../../../validations.yup'
import { screen } from '../styles'

const TRADUCTION = {
    yes: 'Sim',
    no: 'Não',
}

const StepDiagnosis = () => {
    const { values } = useFormikContextSafe<CtxStepAnamnese>()

    return (
        <>
            <div className="h-10" />
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Diagnostico
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>
            <div className={screen()}>
                <div className="w-full col-span-full">
                    <CardSimplePet />
                </div>
                <section className="col-span-full ">
                    <FieldArraySafe
                        ctx={values}
                        name="anamnesis.questions_anamnesis"
                    >
                        {({ remove }) => (
                            <div className="h-44 overflow-auto scroll-smooth scroll-width-thin mine-scroll-bar flex flex-1 w-full flex-col gap-1">
                                {values.anamnesis?.questions_anamnesis?.map(
                                    (anamnesis, index) => (
                                        <ModalConfirm
                                            onConfirm={() => remove(index)}
                                            key={`anamnesis-${index}`}
                                            title="Deseja remover a seguinte questão?"
                                            description={`
                                                    As questões de anamnese caso
                                                    sejam removidas, não serão
                                                    enviadas ao relatório final.
                                                    Caso tenha as removido por
                                                    engano, basta respondê-la
                                                    novamente na seção de anamnese.
                                            `}
                                            message={`${
                                                anamnesis.name_anamnesis
                                            } - ${
                                                TRADUCTION[
                                                    anamnesis.options_anamnesis as
                                                        | 'yes'
                                                        | 'no'
                                                ]
                                            }`}
                                        >
                                            {(showModal) => (
                                                <button
                                                    onClick={showModal}
                                                    type="button"
                                                    key={`anamnesis-${index}`}
                                                    className="w-full rounded-md text-xs py-1 px-2"
                                                >
                                                    <div className="w-full flex flex-row bg-white px-2 rounded-sm border-dashed border border-primary">
                                                        <div className="flex flex-wrap w-full">
                                                            <h6 className="flex-[2] font-mono font-semibold text-left capitalize">
                                                                {
                                                                    anamnesis.name_anamnesis
                                                                }
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
                                                            >
                                                                X
                                                            </button>
                                                        </div>
                                                    </div>
                                                </button>
                                            )}
                                        </ModalConfirm>
                                    ),
                                )}
                            </div>
                        )}
                    </FieldArraySafe>
                    <legend className="col-span-full text-xs text-gray-400 text-center">
                        As questões de anamnese caso sejam removidas, não serão
                        enviadas ao relatório final. Caso tenha as removido por
                        engano, basta respondê-la novamente na seção de anamnese.
                    </legend>
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
