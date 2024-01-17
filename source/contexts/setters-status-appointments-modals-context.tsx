import { create } from 'zustand'
import CanceledScheduledModal from '~/Components/modals/canceled-scheduled-modal'
import ConfirmedScheduledModal from '~/Components/modals/confirmed-scheduled-modal'
import ReScheduledModal from '~/Components/modals/re-scheduled-modal'
import type { VeterinaryConsultation } from '~/types/appointment'

export enum ModalPlus {
    CanceledScheduled = 'CanceledScheduled',
    Rescheduled = 'Rescheduled',
    ConfirmedScheduled = 'ConfirmedScheduled',
}

interface PlusModalState {
    isOpen: {
        [key in ModalPlus]?: boolean
    }
    open: (key: ModalPlus) => void
    close: (key: ModalPlus) => void
    item: VeterinaryConsultation
    setItem: (item: VeterinaryConsultation) => void
    keys: typeof ModalPlus
}

export const usePlusModal = create<PlusModalState>((set) => ({
    isOpen: {},
    open: (key: ModalPlus) => set({ isOpen: { [key]: true } }),
    close: (key: ModalPlus) => set({ isOpen: { [key]: false } }),
    item: {} as VeterinaryConsultation,
    setItem: (item: VeterinaryConsultation) => set({ item }),
    keys: ModalPlus,
}))

const ContextSettersStatusAppointmentsModals = () => {
    const { isOpen, close, open } = usePlusModal()

    return (
        <>
            <CanceledScheduledModal
                closeModal={() => close(ModalPlus.CanceledScheduled)}
                isOpen={isOpen[ModalPlus.CanceledScheduled]}
                showModal={() => open(ModalPlus.CanceledScheduled)}
            >
                {() => <div className="hidden" />}
            </CanceledScheduledModal>

            <ReScheduledModal
                closeModal={() => close(ModalPlus.Rescheduled)}
                isOpen={isOpen[ModalPlus.Rescheduled]}
                showModal={() => open(ModalPlus.Rescheduled)}
            >
                {() => <div className="hidden" />}
            </ReScheduledModal>

            <ConfirmedScheduledModal
                closeModal={() => close(ModalPlus.ConfirmedScheduled)}
                isOpen={isOpen[ModalPlus.ConfirmedScheduled]}
                showModal={() => open(ModalPlus.ConfirmedScheduled)}
            >
                {() => <div className="hidden" />}
            </ConfirmedScheduledModal>
        </>
    )
}

export default ContextSettersStatusAppointmentsModals
