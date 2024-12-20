import { Form, Formik } from 'formik'
import { memo } from 'react'
import { FaWeight } from 'react-icons/fa'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import FieldNumber from '~/Components/molecules/field-number'
import FieldTextArea from '~/Components/molecules/field-text-area'
import CheckboxModalGroup from '~/Components/organism/checkbox-modal-group'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import type { BodyEvolution } from '~/types/medical-records'
import { calcAge } from '~/utils/calc-age'
import type { OptionFormsProps } from '../../medical-records-form'

const BodyEvolutionFormik = ({
    item = {} as BodyEvolution,
    pet,
    handleSubmit,
}: OptionFormsProps<BodyEvolution>) => {
    return (
        <Formik
            initialValues={
                {
                    weight: 0,
                    age: calcAge(pet?.date_birth).toString(),
                    coin: '',
                    cpf_cnpj_who_applied: '',
                    date_application: new Date().toISOString(),
                    height: 0,
                    imc: 0,
                    length: 0,
                    notes: '',
                    name: '',
                    notes_consults: '',
                    type: 'body-evolution',
                    type_profile: 1,
                    type_weight: 'kg',
                    value: 0,
                    who_applied: '',
                    ...item,
                } as BodyEvolution
            }
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit }) => (
                <Form
                    className="flex flex-col items-center justify-center flex-1 w-full gap-1 "
                    onSubmit={handleSubmit}
                >
                    <div className="z-10 flex">
                        <FieldNumber
                            ctx={values}
                            label="Peso"
                            placeholder="Peso do pet em quilos, exemplo = 0.5 (500 gramas)"
                            required
                            name="weight"
                        />
                        <CheckboxModalGroup
                            mode="editable"
                            items={[
                                {
                                    value: 'g',
                                    label: 'Gramas',
                                },
                                {
                                    value: 'kg',
                                    label: 'Quilogramas',
                                },
                                {
                                    value: 'lb',
                                    label: 'Libras',
                                },
                                {
                                    value: 'oz',
                                    label: 'Onças',
                                },
                                {
                                    value: 'ar',
                                    label: 'Arrobas',
                                },
                                {
                                    value: 'q',
                                    label: 'Quintais',
                                },
                                {
                                    value: 't',
                                    label: 'Toneladas',
                                },
                            ]}
                            className="border-none"
                            ctx={values}
                            label="Tipo de Peso"
                            name="type_weight"
                        />
                    </div>

                    <FieldNumber
                        ctx={values}
                        label="Altura"
                        placeholder="Altura do pet em centímetros, exemplo = 32"
                        name="height"
                    />

                    <FieldNumber
                        ctx={values}
                        label="Comprimento"
                        placeholder="Comprimento do pet em centímetros "
                        className="border-gray-300"
                        name="length"
                    />

                    <FieldTextArea
                        ctx={values}
                        label="Anotações Gerais"
                        name="notes"
                        divClassName="col-span-full"
                    />
                    <div className="flex justify-end flex-1 gap-1 col-span-full">
                        <BtnCancel
                            outline
                            className="flex-1 text-gray-400 border-none "
                            label="Cancelar"
                        />

                        <BtnPrimary
                            className="flex-1 text-white"
                            label="Adicionar"
                            type="submit"
                        />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default memo(BodyEvolutionFormik)

export const BodyEvolutionFormModal = ({
    item = {} as BodyEvolution,
    handleSubmit,
    handleClose,
    children,
}: Omit<OptionFormsProps<BodyEvolution>, 'pet'> & {
    children?: (showModal: () => void) => void
}) => {
    const { closeModal, open, showModal } = useModal()
    const title = 'Adicionar Registro'

    return (
        <>
            {children?.(showModal) || (
                <button
                    onClick={showModal}
                    type="button"
                    className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-blue-50"
                >
                    <div className="p-4 bg-blue-100 rounded-full">
                        <FaWeight className="text-4xl text-blue-500" />
                    </div>
                    <div className="ml-4 text-start">
                        <h2 className="text-lg font-bold text-gray-700">
                            Adicionar Registro
                        </h2>
                    </div>
                </button>
            )}
            <Modal onClose={() => closeModal()} open={open}>
                <section className="flex flex-col items-center justify-center flex-1">
                    <div className="w-full">
                        <h6 className="mb-4 font-semibold text-center uppercase">
                            {title}
                        </h6>
                    </div>

                    <BodyEvolutionFormik
                        handleSubmit={handleSubmit}
                        item={item}
                        handleClose={handleClose}
                    />
                </section>
            </Modal>
        </>
    )
}
