import { useMemo } from 'react'
import { BsCashCoin } from 'react-icons/bs'

import * as Yup from 'yup'
import BtnFloating from '~/Components/molecules/btn-floating'
import Modal from '~/Components/organism/modal'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import useModal from '~/hooks/use-modal'
import { partialOneValidation } from '~/pages/Modules/veterinary/AppointmentsPage/components/validations.yup'

type AppointmentsErrModalProps = {
    toggleTab?: (tab: number) => void
}

const schemaStepAppointment = Yup.object().shape(partialOneValidation)

const AppointmentsErrModal = ({ toggleTab }: AppointmentsErrModalProps) => {
    const { closeModal, open, showModal } = useModal()
    const { values } = useFormikContextSafe()

    const [isValid, errs] = useMemo(() => {
        try {
            schemaStepAppointment.validateSync(values, { abortEarly: false })
            return [true, []]
        } catch (err: unknown) {
            if (err instanceof Yup.ValidationError) {
                return [false, err?.errors]
            }

            return [false, []]
        }
    }, [values])

    return (
        <>
            <BtnFloating
                onClick={() => {
                    if (!isValid) {
                        showModal()
                        return
                    }

                    toggleTab?.(1)
                }}
                icon={BsCashCoin}
                title="Ir Para Pagamentos"
            />

            <Modal open={open} onClose={() => closeModal()} mobilePage={false}>
                <div className="space-y-2">
                    <h1 className="text-base font-bold">Erros</h1>
                    <ul className="mb-2">
                        {errs.map((err, index) => (
                            <li key={index} className="text-sm">
                                <span className="mr-2">⚠️</span>
                                {err}
                            </li>
                        ))}
                    </ul>

                    <strong className="mt-4 text-sm italic font-semibold">
                        Corrija os erros para continuar
                    </strong>
                </div>
            </Modal>
        </>
    )
}

export default AppointmentsErrModal
