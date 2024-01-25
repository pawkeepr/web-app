import { useRef, type ForwardRefExoticComponent, type RefAttributes } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import MyImage from '~/Components/atoms/my-image'
import type { IHookModal } from '~/hooks/use-modal'
import useResizeMobile from '~/hooks/use-resize-mobile'
import type { IMainResponsibleGuardian } from '~/types/pet-v2'
import { getNameTutor } from '~/utils/get-name-tutors'
import BoxButtonsTutors from '../box-buttons-tutors'
import ModalBoxButtonsTutors from '../box-buttons-tutors/modal-box-buttons-tutors'
import { card } from '../card-scheduled'

type CardTutorsProps = {
    tutor: IMainResponsibleGuardian
}

const CardTutor = ({ tutor }: CardTutorsProps) => {
    const { isMobile } = useResizeMobile()
    const ref = useRef<ForwardRefExoticComponent<RefAttributes<IHookModal>>>(null)

    return (
        <>
            <article
                key={tutor?.first_name}
                onClick={() => {
                    if (!isMobile) return
                    if (!ref?.current) return
                    const castRef = ref.current as unknown as IHookModal
                    castRef?.showModal?.()
                }}
                onKeyUp={() => {}}
                className={card({
                    isMobile,
                })}
            >
                <picture className="mobile:w-full flex flex-1 justify-center items-center">
                    <MyImage
                        src={tutor?.avatar}
                        alt={`Foto de Perfil de ${getNameTutor(tutor)}`}
                        width={160}
                        height={160}
                    />
                </picture>
                {isMobile && (
                    <div className="text-gray-700 mb-2 text-center w-full mt-1 capitalize">
                        <strong>
                            <p>{`${getNameTutor(tutor)}`}</p>
                        </strong>
                    </div>
                )}
                <div className="flex flex-col flex-[2] mobile:flex-1 w-full ">
                    <div className="flex mobile:gap-3 justify-around items-center mt-4 px-2">
                        {!isMobile && (
                            <section className="justify-center flex items-start flex-col flex-1">
                                <div className="text-gray-700 mb-2 mobile:text-center w-full mt-1 capitalize">
                                    <strong>
                                        <p>{getNameTutor(tutor)}</p>
                                    </strong>
                                </div>
                                <div className="text-gray-700  mobile:text-center w-full mt-1 capitalize">
                                    <h3 className="font-bold mb-1">Email:</h3>
                                    <p>{tutor?.contact?.email}</p>
                                </div>
                                <div className="text-gray-700 mobile:text-center w-full mt-1 capitalize">
                                    <h3 className="font-bold mb-1">
                                        <span className="d-inline-block align-middle mr-2">
                                            <FaWhatsapp className="text-green-600 text-lg align-middle" />
                                        </span>
                                        WhatsApp:
                                    </h3>
                                    <p>
                                        {tutor?.contact?.whatsapp ||
                                            'Não informado'}
                                    </p>
                                </div>
                            </section>
                        )}

                        <section className="justify-center flex flex-1 items-start flex-col gap-2 ">
                            <div className="text-gray-700 mobile:text-center w-full mt-1 capitalize">
                                <h3 className="font-bold mb-1">País:</h3>
                                <p>{tutor?.address?.country || 'Não informado'}</p>
                            </div>
                            <div className="text-gray-700 mobile:text-center w-full mt-1 capitalize">
                                <h3 className="font-bold mb-1">Cidade:</h3>
                                <p>
                                    {tutor?.address?.city || 'Não informado'}-
                                    {tutor?.address?.state}
                                </p>
                            </div>
                            <div className="text-gray-700 mobile:text-center w-full mt-1 capitalize">
                                <h3 className="font-bold mb-1">CEP:</h3>
                                <p>{tutor?.address?.zipCode || 'Não informado'}</p>
                            </div>
                        </section>
                    </div>
                    {!isMobile && <BoxButtonsTutors item={tutor} />}
                    {isMobile && <ModalBoxButtonsTutors item={tutor} ref={ref} />}
                </div>
            </article>
        </>
    )
}

export default CardTutor
