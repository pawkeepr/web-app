import { type ForwardRefExoticComponent, type RefAttributes, useRef } from 'react'
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
        <article
            key={tutor?.cpf_cnpj}
            onClick={() => {
                if (!isMobile) return
                if (!ref?.current) return
                const castRef = ref.current as unknown as IHookModal
                castRef?.showModal?.()
            }}
            onKeyUp={() => { }}
            style={{
                cursor: isMobile ? 'pointer' : 'default',
                outline: 'none',
            }}
            className={card({
                isMobile,
            })}
        >
            <div className="flex-[2] flex-col items-center justify-center flex">
                <MyImage
                    className='text-gray-400 mobile:w-24 mobile:h-24 w-40 h-40 rounded-full object-cover'
                    src={tutor?.url_img as string}
                    alt={`Foto de Perfil de ${getNameTutor(tutor)}`}
                />
            </div>
            <div className="card-body mobile:text-xs text-sm mobile:py-4 px-0 m-0 flex-[3] font-sans">

                <strong>
                    <p>{`${getNameTutor(tutor)}`}</p>
                </strong>

                <div className="text-gray-500 ">
                    <h3 className="font-bold mb-1">Email:</h3>
                    <p>{tutor?.contact?.email}</p>
                </div>
                <div className="text-gray-500 ">
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

                <div className="card-actions mobile:hidden">
                    {!isMobile && <BoxButtonsTutors item={tutor} />}
                    {isMobile && <ModalBoxButtonsTutors item={tutor} ref={ref} />}
                </div>
            </div>
        </article>
    )
}

export default CardTutor
