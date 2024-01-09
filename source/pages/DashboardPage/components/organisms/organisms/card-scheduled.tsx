import cn from 'classnames';
import MyImage from '~/Components/atoms/my-image';
import ViewAppointment from '~/Components/modals/view-appointment/modal-view-appointment';
import ravena from '~/assets/images/ravena.jpeg';
import { IAppointmentVet } from '~/store/slices/appointment-vet/types';
import BoxButtons from './box-buttons';

type BoxButtonsProps = {
    item: IAppointmentVet;
};

type CardScheduledProps = {
    checked?: boolean;
    appointment: IAppointmentVet;
    boxButtons?: null | ((props: BoxButtonsProps) => JSX.Element);
};

const CardScheduled = ({
    checked,
    appointment,
    boxButtons = (props) => <BoxButtons {...props} />,
}: CardScheduledProps) => {
    const BoxButtons = boxButtons;

    return (
        <div
            key={appointment?.name_tutor}
            className={cn(
                'bg-white relative flex flex-col cursor-pointer rounded-lg px-2 py-2 shadow-md focus:outline-none`',
                {
                    '!bg-primary-500 bg-opacity-60 text-white': checked,
                },
            )}
        >
            <div className="mb-2">
                <div className="flex flex-col w-full">
                    <div className="flex mobile:gap-3 justify-around items-center">
                        <MyImage
                            src={ravena}
                            alt="Picture of the author"
                            width={150}
                            height={150}
                            className="h-32 mt-3 w-32 rounded-full"
                        />

                        <div className="flex flex-col items-center">
                            {'Informações Do Agendamento:'}
                            <div className="">
                                <div className="p-2">
                                    <p className="text-gray-700 md:hidden">
                                        Nome do pet:{' '}
                                        {appointment?.pet_data.name_pet}
                                    </p>
                                    <p className="text-gray-700">
                                        Data:{' '}
                                        {
                                            appointment?.dates_consults
                                                .date_consultation
                                        }
                                    </p>
                                    <p className="text-gray-700">
                                        Horário:{' '}
                                        {
                                            appointment?.dates_consults
                                                .time_consultation
                                        }
                                    </p>
                                    <p className="text-gray-700 md:hidden">
                                        Contato:{appointment?.tutor_data.phone}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mobile:hidden items-center">
                            {'Informações Do Pet:'}

                            <div className="p-2 ">
                                <p className="text-gray-700">
                                    Nome do pet:{' '}
                                    {appointment?.pet_data.name_pet}
                                </p>
                                <p className="text-gray-700">
                                    Especie: {appointment?.pet_data.specie}
                                </p>
                                <p className="text-gray-700">
                                    Sexo: {appointment?.pet_data.sex}
                                </p>
                                <p className="text-gray-700">Microchip: 1294</p>
                            </div>
                        </div>
                        <div className="flex mobile:hidden flex-col">
                            {'Informações Do Tutor:'}

                            <div className="p-2">
                                <p className="text-gray-700">
                                    Nome: {appointment?.tutor_data.name}
                                </p>
                                <p className="text-gray-700">
                                    Nome: {appointment?.tutor_data.email}
                                </p>
                                <p className="text-gray-700">
                                    Contato: {appointment?.tutor_data.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                    {checked && (
                        <div className="flex justify-end text-white">
                            <ViewAppointment props={appointment} />
                        </div>
                    )}
                </div>
            </div>

            {BoxButtons && <BoxButtons item={appointment} />}
        </div>
    );
};

export default CardScheduled;
