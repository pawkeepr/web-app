import { forwardRef, useImperativeHandle } from 'react'
import { BtnConfirm } from '~/Components/atoms/btn'
import AvatarPet from '~/Components/molecules/avatar-pet'
import useModal from '~/hooks/use-modal'
import type { IPetV2Data } from '~/types/pet-v2'
import { MapOptionSpecies, type Species } from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import Modal from '../modal'
import BoxButtonsPets from './box-buttons-pets'

type ModalBoxButtonsPetProps = {
    item: IPetV2Data
    children?: null | ((props: { showModal: () => void }) => JSX.ElementType)
}

const ModalBoxButtonsPet = forwardRef(
    ({ item: pet, children }: ModalBoxButtonsPetProps, ref) => {
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
                        <AvatarPet
                            name_pet={pet?.name_pet}
                            specie={
                                MapOptionSpecies[
                                    pet.specie as keyof typeof MapOptionSpecies
                                ] as Species
                            }
                        />
                        <section className="w-full grid grid-cols-2 mt-4">
                            <div className="col-span-1">
                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Pet:</h3>
                                    <p>{`${pet?.name_pet}, ${pet?.specie}, ${pet?.race}`}</p>
                                </div>

                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Idade do Pet:</h3>
                                    <p>{calcAge(pet?.date_birth)} Anos</p>
                                </div>

                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Sexo do Pet:</h3>
                                    <p>{pet?.sex}</p>
                                </div>
                            </div>
                        </section>

                        <div className="w-full mt-4 self-end">
                            <BoxButtonsPets item={pet} />
                        </div>
                    </div>
                </Modal>
            </>
        )
    },
)

export default ModalBoxButtonsPet
