import { forwardRef, useImperativeHandle, useMemo } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import withControl from '~/Components/helpers/with-control'
import AvatarPet from '~/Components/molecules/avatar-pet'
import useModal from '~/hooks/use-modal'
import type { VeterinaryConsultation } from '~/types/appointment'
import { BreedNames } from '~/types/breedType'
import { GenderBR, Species, type Gender } from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import { getNameTutor } from '~/utils/get-name-tutors'
import Modal from '../modal'
import BoxButtons from './box-buttons'

export type ModalBoxButtonsProps<T> = {
    item: T
    children: (props: { showModal: () => void }) => JSX.Element
}

const ModalBoxButtons = forwardRef(
    ({ item, children }: ModalBoxButtonsProps<VeterinaryConsultation>, ref) => {
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

        const pet = useMemo(
            () => ({
                ...item.tutor_pet_vet.pet,
                specie: Species[
                    item.tutor_pet_vet?.pet?.specie as keyof typeof Species
                ],
                gender: GenderBR[item.tutor_pet_vet?.pet?.sex as Gender],
                race: BreedNames[
                    item.tutor_pet_vet?.pet?.race as keyof typeof BreedNames
                ],
                name_tutor: getNameTutor(item.tutor_pet_vet?.tutor),
                contact: item.tutor_pet_vet?.tutor?.contact,
            }),
            [item.tutor_pet_vet],
        )

        const dateFormatted = useMemo(() => {
            try {
                return `${Intl.DateTimeFormat('pt-BR', {}).format(
                    new Date(item.dates_consults.date_consultation),
                ) || 'Não informado'
                    } às ${item.dates_consults.time_consultation}`
            } catch (_) {
                return 'Não informado'
            }
        }, [item.dates_consults])

        return (
            <>
                {children?.({ showModal })}
                <Modal onClose={() => closeModal()} open={open}>
                    <article className="flex flex-col flex-1 justify-between items-center">
                        <section className="flex flex-col flex-1 justify-between items-center">
                            <AvatarPet
                                classNames={{
                                    img: 'mobile:w-40 mobile:h-40',
                                }}
                                name_pet={pet?.name_pet}
                                specie={item?.tutor_pet_vet?.pet?.specie as Species}
                            />
                            <h1 className="text-center text-muted text-xl font-sans">
                                {pet?.name_pet}
                            </h1>
                            <h2>{calcAge(pet?.date_birth)} Anos</h2>
                            {item.appointment_status?.canceled === 'no' && (
                                <div className="text-gray-500 mb-2 w-full text-center mt-2">
                                    <h3 className="font-bold">Data Marcada:</h3>
                                    <p>{dateFormatted}</p>
                                </div>
                            )}
                        </section>
                        <section className="w-full grid grid-cols-1 mt-4">
                            <div className="col-span-1">
                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Pet:</h3>
                                    <p>{`${pet?.specie}, ${pet?.race}`}</p>
                                </div>
                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Sexo do Pet:</h3>
                                    <p>{pet?.gender}</p>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Tutor:</h3>
                                    <p>{pet?.name_tutor}</p>
                                </div>

                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Telefone:</h3>
                                    <p>{pet?.contact?.phone}</p>
                                </div>

                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Whatsapp:</h3>
                                    <p className="flex gap-1">
                                        <FaWhatsapp className="text-green-600 text-xl" />
                                        {pet?.contact?.whatsapp || 'Não informado'}
                                    </p>
                                </div>

                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Email:</h3>
                                    <p>{pet?.contact?.email}</p>
                                </div>
                            </div>
                        </section>

                        <div className="w-full mt-4 self-end">
                            <BoxButtons item={item} />
                        </div>
                    </article>
                </Modal>
            </>
        )
    },
)

export default withControl(ModalBoxButtons)
