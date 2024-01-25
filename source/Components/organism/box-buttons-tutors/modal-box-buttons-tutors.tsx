import { forwardRef, useImperativeHandle } from 'react'
import { BtnConfirm } from '~/Components/atoms/btn'
import MyImage from '~/Components/atoms/my-image'
import useModal from '~/hooks/use-modal'
import type { IMainResponsibleGuardian } from '~/types/pet-v2'
import { calcAge } from '~/utils/calc-age'
import { getNameTutor } from '~/utils/get-name-tutors'
import Modal from '../modal'
import BoxButtonsTutors from './box-buttons-tutors'

type ModalBoxButtonsTutorsProps = {
    item: IMainResponsibleGuardian
    children?: null | ((props: { showModal: () => void }) => JSX.ElementType)
}

const ModalBoxButtonsTutors = forwardRef(
    ({ item: tutor, children }: ModalBoxButtonsTutorsProps, ref) => {
        const { closeModal, open, showModal } = useModal()

        useImperativeHandle(
            ref,
            () => {
                return {
                    showModal,
                    closeModal,
                    open,
                }
            },
            [open, closeModal, showModal],
        )

        return (
            <>
                {children?.({ showModal })}
                {!children && (
                    <BtnConfirm
                        label="Ver Mais"
                        className="border-none mobile:!w-full mobile:col-span-full text-gray-500 bg-transparent"
                        onClick={showModal}
                    />
                )}

                <Modal
                    onOpen={() => showModal}
                    onClose={() => closeModal()}
                    modal
                    nested
                    open={open}
                    lockScroll
                    className="pb-0 w-[750px]"
                >
                    <div className="flex flex-col justify-between items-center w-full h-[90%] p-4">
                        <MyImage
                            src={tutor?.avatar}
                            alt={`Foto de Perfil de ${getNameTutor(tutor)}`}
                            width={160}
                            height={160}
                            className="h-32 mt-3 w-32 rounded-full"
                        />
                        <section className="w-full grid grid-cols-2 mt-4">
                            <div className="col-span-1">
                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Pet:</h3>
                                    <p>{`${getNameTutor(tutor)}`}</p>
                                </div>

                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Idade do Pet:</h3>
                                    <p>{calcAge(tutor?.date_birth)} Anos</p>
                                </div>

                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Sexo do Pet:</h3>
                                    <p>{tutor?.sex}</p>
                                </div>
                            </div>
                        </section>

                        <div className="w-full mt-4 self-end">
                            <BoxButtonsTutors item={tutor} />
                        </div>
                    </div>
                </Modal>
            </>
        )
    },
)

export default ModalBoxButtonsTutors
