import cn from 'classnames'
import { FaWhatsapp } from 'react-icons/fa'
import MyImage from '~/Components/atoms/my-image'
import type { IMainResponsibleGuardian } from '~/types/pet-v2'
import { getNameTutor } from '~/utils/get-name-tutors'

type CardTutorsProps = {
    tutor: IMainResponsibleGuardian
}

const CardTutor = ({ tutor }: CardTutorsProps) => {
    return (
        <div
            key={tutor?.name}
            className={cn(
                'bg-white relative flex flex-col cursor-pointer rounded-lg px-2 py-2 shadow-md focus:outline-none`',
            )}
        >
            <div className="mb-2">
                <div className="flex flex-col w-full">
                    <div className="flex mobile:gap-3 justify-around items-center">
                        <MyImage
                            src={tutor?.avatar}
                            alt={`Foto de Perfil de ${getNameTutor(tutor)}`}
                            width={150}
                            height={150}
                            className="h-32 mt-3 w-32 rounded-full"
                        />
                        <div className="flex flex-col">
                            <div className="p-2">
                                <p className="text-gray-700">
                                    <strong>Nome: </strong>
                                    {getNameTutor(tutor)}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Email: </strong> {tutor?.contact?.email}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Contato: </strong>
                                    {tutor?.contact?.whatsapp}
                                    <span className="d-inline-block align-middle ml-2 mb-1">
                                        <FaWhatsapp className="text-green-600 text-lg align-middle" />
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col mobile:hidden">
                            <div className="p-2 ">
                                <p className="text-gray-700">
                                    <strong>País: </strong>
                                    {tutor?.address?.country}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Cidade: </strong>
                                    {tutor?.address?.city}-{tutor?.address?.state}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Cep: </strong>
                                    {tutor?.address?.zipCode}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardTutor
