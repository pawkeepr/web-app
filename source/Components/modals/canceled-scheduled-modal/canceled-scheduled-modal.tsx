import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import FieldTextArea from '~/Components/molecules/field-text-area'
import Modal from "~/Components/organism/modal"
import DateConsults from '~/entities/DatesConsults'
import useModal from '~/hooks/use-modal'
import { IAppointmentVet } from '~/store/slices/appointment-vet/types'

import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    id: Yup.string().required('Campo obrigatório'),
    reason_canceled: Yup.string().required('Campo obrigatório')
})

type onChangeOpen = (arg: boolean) => void

type ChildrenProps = {
    showModal: onChangeOpen
}

type CanceledScheduledModalProps = {
    children?: (params: ChildrenProps) => React.ReactNode
    item: IAppointmentVet
}

const CanceledScheduledModal = ({
    children,
    item,
}: CanceledScheduledModalProps) => {
    const { closeModal, open, showModal } = useModal()

    const onSubmit = async (values: IAppointmentVet) => {
        const item = DateConsults.build(values)
        console.log(item)

        setTimeout(() => {
            closeModal()
        }, 3000)
    }

    return (
        <>

            {
                children && children({ showModal })
            }
            {
                !children && (
                    <div className="flex items-center justify-center">
                        <button
                            type="button"
                            onClick={showModal}
                            className="
                                rounded-md 
                                bg-secondary-500 bg-opacity-20 
                                px-4 py-2 text-sm 
                                font-medium 
                                text-white 
                                hover:bg-opacity-30 
                                focus:outline-none 
                                focus-visible:ring-2 
                                focus-visible:ring-white 
                                focus-visible:ring-opacity-75
                            "
                        >
                            {'label'}
                        </button>
                    </div>
                )
            }


            <Modal
                onOpen={() => showModal}
                onClose={() => closeModal()}
                modal
                nested
                open={open}
                lockScroll
                className=" 
                w-fit
                h-fit
                flex
                flex-col     
                "
            >

                <Formik
                    initialValues={{
                        ...item,
                        reason_canceled: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {
                        ({
                            isValid,
                            isSubmitting,
                            handleSubmit,
                        }) => (
                            <Form className="w-full h-full flex  " onSubmit={handleSubmit}>
                                <div className="flex flex-col min-h-full items-center justify-center p-4 text-center">


                                    <h2
                                        className="text-xl font-semibold leading-6 text-gray-600 dark:!text-gray-200 text-center"
                                    >
                                        {'Cancelar Agendamento'}
                                    </h2>

                                    <p
                                        className="text-xs font-bold text-primary-500 dark:!text-secondary-500 text-center mb-2"
                                    >
                                        {'Esta ação não poderá ser desfeita.'}
                                    </p>

                                    <FieldTextArea
                                        required
                                        label="Motivo do cancelamento"
                                        name="reason_canceled"

                                    />

                                    <div className="mt-4 flex justify-center items-center">
                                        <BtnCancel
                                            type="button"
                                            onClick={closeModal}
                                            label="Desistir"
                                            condition={!isSubmitting}
                                            className='text-gray-600'
                                        />

                                        <BtnPrimary
                                            type="submit"
                                            label="Cancelar Agendamento"
                                            isLoading={isSubmitting}
                                            disabled={!isValid}
                                        />
                                    </div>
                                </div>
                            </Form>
                        )
                    }

                </Formik>
            </Modal >
        </>
    )
}

export default CanceledScheduledModal