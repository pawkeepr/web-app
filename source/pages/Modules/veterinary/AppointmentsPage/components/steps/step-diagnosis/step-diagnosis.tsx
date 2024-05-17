import ModalConfirm from '~/Components/modals/confirm-modal/modal-confirm'
import FieldTextArea from '~/Components/molecules/field-text-area'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import CardSimplePet from '../../molecules/card-simple-pet'
import type { CtxStepAnamnese } from '../../validations.yup'
import { screen } from '../styles'

const TRADUCTION = {
    yes: 'Sim',
    no: 'Não',
}

const StepDiagnosis = () => {
    const { values, setFieldValue } = useFormikContextSafe<CtxStepAnamnese>()

    return (
        <>
            <div className="h-10" />
            <h4 className="font-sans text-base font-semibold text-center capitalize">
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
                    <div className="flex flex-col flex-1 w-full gap-1 overflow-auto h-44 scroll-smooth scroll-width-thin mine-scroll-bar">
                        {values?.anamnesis?.questions_anamnesis
                            ?.filter(
                                (question) =>
                                    question?.checked !== null &&
                                    question?.checked !== undefined,
                            )
                            ?.map((anamnesis, index) => (
                                <ModalConfirm
                                    onConfirm={() => {
                                        const items =
                                            values?.anamnesis?.questions_anamnesis
                                        items[anamnesis.id as number] = {
                                            ...items[anamnesis.id as number],
                                            checked: null,
                                        }

                                        setFieldValue(
                                            'anamnesis.questions_anamnesis',
                                            items,
                                        )
                                    }}
                                    key={`anamnesis-${
                                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                        index
                                    }`}
                                    title="Deseja remover a seguinte questão?"
                                    description={`
                                                    As questões de anamnese caso
                                                    sejam removidas, não serão
                                                    enviadas ao relatório final.
                                                    Caso tenha as removido por
                                                    engano, basta respondê-la
                                                    novamente na seção de anamnese.
                                            `}
                                    message={`${anamnesis?.name_anamnesis} - ${
                                        TRADUCTION[
                                            anamnesis?.options_anamnesis as
                                                | 'yes'
                                                | 'no'
                                        ]
                                    }`}
                                >
                                    {(showModal) => (
                                        <button
                                            onClick={showModal}
                                            type="button"
                                            key={`anamnesis-${
                                                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                                index
                                            }`}
                                            className="w-full px-2 py-1 text-xs rounded-md"
                                        >
                                            <div className="flex flex-row w-full px-2 bg-white border border-dashed rounded-sm border-primary">
                                                <div className="flex flex-wrap w-full">
                                                    <h6 className="flex-[2] font-mono font-semibold text-left capitalize">
                                                        {anamnesis?.name_anamnesis}
                                                    </h6>

                                                    <p className="flex-1 font-mono capitalize">
                                                        {
                                                            TRADUCTION[
                                                                anamnesis?.options_anamnesis as
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
                            ))}
                    </div>

                    <legend className="text-xs text-center text-gray-400 col-span-full">
                        As questões de anamnese caso sejam removidas, não serão
                        enviadas ao relatório final. Caso tenha as removido por
                        engano, basta respondê-la novamente na seção de anamnese.
                    </legend>
                </section>
                <FieldTextArea
                    isValid={values?.anamnesis?.note.length > 0}
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
