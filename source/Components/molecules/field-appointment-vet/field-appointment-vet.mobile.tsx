import { PlusIcon } from '@heroicons/react/24/solid'
import { Form, Formik } from 'formik'
import { startTransition, useState } from 'react'
import withControl from '~/Components/helpers/with-control'
import ModalScheduledV2 from '~/Components/modals/scheduled-v2-modal'
import ModalWarning from '~/Components/modals/warning-modal/modal-warning'
import FieldDocument from '~/Components/molecules/field-document/field-document'
import isValidCPF from '~/validations/cpf'
import styles from './field-document.module.scss'

type InitialValues = {
    cpf_tutor: string
}

type onChangeOpen = (arg: boolean) => void

type HandleProps = {
    onChangeOpen: onChangeOpen
    onChangeDocument: (doc: string) => void
}

type FieldDocumentAppointmentMobileProps = {
    selectedTabInitial?: number
    children?: (props: HandleProps) => JSX.Element
}

const initialValues: InitialValues = { cpf_tutor: '' }

const FieldDocumentAppointmentMobile = ({
    selectedTabInitial = 1,
    children,
}: FieldDocumentAppointmentMobileProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const onHandleSubmit = ({ onChangeDocument, onChangeOpen }: HandleProps) => {
        return async (values: InitialValues) => {
            if (!isValidCPF(values.cpf_tutor) && selectedTabInitial === 1) {
                setIsOpen(true)
                return
            }

            startTransition(() => {
                onChangeDocument(values.cpf_tutor)
                onChangeOpen(true)
            })
        }
    }

    return (
        <>
            <ModalWarning
                title="CPF INVÁLIDO"
                description="Por favor, cadastrar um CPF válido para prosseguir."
                isOpen={isOpen}
                closeModal={() => {
                    setIsOpen(false)
                }}
            />
            <ModalScheduledV2 selectedTabInitial={selectedTabInitial}>
                {({ onChangeOpen, onChangeDocument }) => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onHandleSubmit({
                            onChangeDocument,
                            onChangeOpen,
                        })}
                        enableReinitialize
                    >
                        {({ handleSubmit, values }) => (
                            <Form
                                className="flex flex-row items-center justify-end"
                                onSubmit={handleSubmit}
                            >
                                {children?.({
                                    onChangeOpen,
                                    onChangeDocument,
                                }) || (
                                        <div
                                            className={`
                                                fixed flex flex-row items-center 
                                                justify-end opacity-100 z-50 
                                                bottom-[68px] right-2 web:bottom-0
                                                w-[95vw] pt-3
                                                transition-all duration-300
                                                ${styles['field-document']}
                                    `}
                                        >
                                            <FieldDocument
                                                ctx={values}
                                                name="cpf_tutor"
                                                placeholder="Agendar/Nova Consulta"
                                                className='!w-[70vw] mr-2 web:hidden'
                                                classNames={{
                                                    input: 'rounded-full shadow-md overflow-visible border border-secondary-500'
                                                }}
                                                onlyCPF
                                            />
                                            <button
                                                type="submit"
                                                className="
                                                        bg-primary-500 p-3 rounded-full 
                                                        shadow-2xl 
                                                        transition duration-500 ease-in-out
                                                        opacity-70 hover:opacity-100  flex items-center justify-center
                                                        mb-3
                                                    "
                                            >
                                                <PlusIcon className="w-5 h-5 text-white" />
                                            </button>
                                        </div>
                                    )}
                            </Form>
                        )}
                    </Formik>
                )}
            </ModalScheduledV2>
        </>
    )
}

export default withControl(FieldDocumentAppointmentMobile)
