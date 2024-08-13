import { FaWhatsapp } from 'react-icons/fa'
import MyImage from '~/Components/atoms/my-image'
import type { IMainResponsibleGuardian } from '~/types/pet-v2'
import { getNameTutor } from '~/utils/get-name-tutors'
import BoxButtonsTutors from '../box-buttons-tutors'
import ModalBoxButtonsTutors from '../box-buttons-tutors/modal-box-buttons-tutors'
import Card from '../card'
import Link from 'next/link'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

type CardTutorsProps = {
    tutor: IMainResponsibleGuardian
}

const CardTutor = ({ tutor }: CardTutorsProps) => {
    
    const router = useRouter()

    const goToTutorProfile = useCallback(() => {
        router.push(
            `/public-profile/${tutor.cpf_cnpj as string}`,
        )
    }, [tutor])
    
    return (
        <Card
            boxButtons={() => <BoxButtonsTutors item={tutor} />}
            item={tutor}
            modal={ModalBoxButtonsTutors}
            sectionAvatar={() => (
                <MyImage
                    className='text-gray-400 mobile:w-24 mobile:h-24 w-40 h-40 rounded-full object-cover'
                    src={tutor?.url_img as string}
                    alt={`Foto de Perfil de ${getNameTutor(tutor)}`}
                />
            )}

        >
            <>
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
                    <p>{tutor?.contact?.whatsapp || 'Não informado'}</p>
                </div>
                <div className="text-gray-500">
                    <Link
                        href={'/profile'}
                    >
                        <span className="font-bold mb-1 align-middle">
                            Ver Perfil
                        </span>
                    </Link>
                </div>
            </>
        </Card>
    )
}

export default CardTutor
