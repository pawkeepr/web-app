import withCompose from '~/Components/helpers/with-compose'
import AvatarPet from '~/Components/molecules/avatar-pet'
import useModal, { type NameKeys } from '~/hooks/use-modal'
import { useTranslations } from '~/hooks/use-translations'
import type { Pet } from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import type { Species } from '~/types/speciesType'
import type { ModalBoxButtonsProps } from '../box-buttons/modal-box-buttons'
import Modal from '../modal'
import BoxButtonsPets from './box-buttons-pets'
const ModalBoxButtonsPet = ({ item: pet, children }: ModalBoxButtonsProps<Pet>) => {
    const { closeModal, open, showModal } = useModal({
        name: pet.id_pet as NameKeys,
    })
    const { t } = useTranslations('common')

    return (
        <>
            {children?.({ showModal })}
            <Modal onClose={() => closeModal()} open={open} mobilePage={false}>
                <div className="flex flex-col items-center justify-between p-6">
                    <div className="relative flex flex-col justify-between w-[350px] h-[200px] p-5 bg-gradient-to-r from-primary-400 to-secondary-300 border-2 border-gray-200 shadow-theme-3 rounded-lg">
                        <div className="flex items-center w-full ">
                            <div className="flex-1">
                                <AvatarPet
                                    classNames={{
                                        img: ' !h-20 !w-20 shadow-theme-4 rounded-full',
                                    }}
                                    src={pet.url_img}
                                    name_pet={pet.name_pet}
                                    specie={pet.specie as Species}
                                />
                            </div>
                            <div className="flex flex-col flex-[2] w-full tracking-widest text-gray-800 uppercase">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {pet.name_pet}
                                </h3>
                                <p className="text-xs text-gray-700">
                                    {t(pet.specie)}
                                </p>
                                <p className="text-xs text-gray-700">
                                    {t(pet.race)}
                                </p>
                                <p className="text-xs text-gray-700">
                                    {' '}
                                    {pet.date_birth &&
                                        Intl.DateTimeFormat().format(
                                            new Date(
                                                pet.date_birth as unknown as Date,
                                            ),
                                        )}
                                </p>
                                <p className="text-xs text-gray-700">
                                    {t(pet.sex)}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 text-base tracking-wider text-gray-600 text-start">
                            <span className="font-semibold">
                                1114 1111 1111 1114
                            </span>
                        </div>

                        <img
                            src="/logo-default.webp"
                            alt="Logo"
                            className="absolute w-32 h-16 bottom-1 right-2 opacity-20"
                        />
                    </div>
                    <div className="self-end w-full mt-4">
                        <BoxButtonsPets item={pet} />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default withCompose(ModalBoxButtonsPet) as typeof ModalBoxButtonsPet
