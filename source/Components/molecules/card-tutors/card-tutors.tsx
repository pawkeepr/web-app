import cn from 'classnames';
import MyImage from "~/Components/atoms/my-image";
import { FaWhatsapp } from 'react-icons/fa';
import { Tutor } from '~/store/slices/tutors/types';

type CardTutorsProps = {
    tutor: Tutor
    checked?: boolean;
}


const CardTutor = ({ tutor, checked}: CardTutorsProps) => {
    console.log(tutor, 'tutor');

    return (
        <div
            key={tutor?.name}
            className={
                cn(
                    'bg-white relative flex flex-col cursor-pointer rounded-lg px-2 py-2 shadow-md focus:outline-none`',
                    {
                        '!bg-primary-500 bg-opacity-60 text-white': checked,
                    })

            }
        >
            <div className="mb-2">
                <div className="flex flex-col w-full">
                    <div className="flex mobile:gap-3 justify-around items-center">
                        <MyImage
                            src={tutor?.avatar}
                            alt={`Foto de Perfil de ${tutor?.name}`}
                            width={150}
                            height={150}
                            className="h-32 mt-3 w-32 rounded-full"
                        />
                        <div className="flex flex-col">

                            <h3 className='font-semibold mobile:hidden'>Informações Do Tutor:</h3>

                            <div className="p-2">
                                <p className="text-gray-700"><strong>Nome: </strong>{tutor?.name}</p>
                                <p className="text-gray-700"><strong>Email: </strong> {tutor?.email}</p>
                                <p className="text-gray-700"><strong>Contato: </strong>{tutor?.phone}
                                <span className="d-inline-block align-middle ml-2 mb-1">
                                    <FaWhatsapp className="text-green-600 text-lg align-middle" />
                                </span>
                                </p>
                               
                            </div>

                        </div>
                        <div className="flex flex-col mobile:hidden">
                        <h3 className='font-semibold mobile:hidden'>Logradouro:</h3>
                            <div className="p-2 ">
                                <p className="text-gray-700"><strong>País: </strong>{tutor?.country}</p>
                                <p className="text-gray-700"><strong>Cidade: </strong>{tutor?.city}-{tutor?.state}</p>
                                <p className="text-gray-700"><strong>Cep: </strong>{tutor?.zipCode}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardTutor