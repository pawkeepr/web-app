import { UserIcon } from '@heroicons/react/24/solid'
import { BsFillSendExclamationFill } from 'react-icons/bs'
import { FaStethoscope } from 'react-icons/fa'
import { PiWhatsappLogo } from 'react-icons/pi'
import { BtnFloating } from '~/Components/molecules/btn-floating/btn-floating'
import { card } from '~/Components/organism/card'
import Loader from '~/Components/organism/loader'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import { useTranslations } from '~/hooks/use-translations'
import useProfile from '~/store/hooks/profile/use-profile'
import { useListUberVet } from '~/store/hooks/uber-vet'

const ModalSearchUberVet = () => {
    const { closeModal, open, showModal } = useModal()
    const { data, isPending } = useListUberVet()
    const { data: profile } = useProfile()
    const { t } = useTranslations()

    const handleOpenWhatsapp = (phone: string) => {
        const numberPhone = phone.replace(/\D/g, '')

        const defaultMessage =
            'Olá, vi teu contato na Pawkeepr e gostaria de saber sobre a possibilidade de agendar uma consulta. Podemos conversar?'
        const encodedMessage = encodeURIComponent(defaultMessage)
        const url = `https://api.whatsapp.com/send/?phone=${numberPhone}&text=${encodedMessage}&type=phone_number&app_absent=0`
        window.open(url, '_blank')
    }

    return (
        <>
            <BtnFloating
                icon={(props) => <FaStethoscope {...props} />}
                title="Buscar Veterinário"
                onClick={() => {
                    showModal()
                }}
            />

            <Modal
                onClose={() => {
                    closeModal()
                }}
                mobilePage
                classNames={{
                    modal: '!min-w-[600px]',
                }}
                open={open}
            >
                <section>
                    <p className="text-base text-center text-gray-600">
                        <span>Buscar Veterinários na Região</span>
                        <br />
                        <strong>{profile?.user_information?.address?.city}</strong>
                    </p>
                    <Loader
                        message="Buscando Veterinários na sua região"
                        condition={isPending && !data}
                        type="ThreeDots"
                    />

                    <div className="flex flex-wrap justify-center">
                        {data?.map((vet) => (
                            <article
                                key={vet.veterinary_information?.crmv}
                                className={card({
                                    className: 'py-4 px-2 gap-2',
                                })}
                            >
                                <section className="flex items-center justify-center ">
                                    <UserIcon className="w-24 h-16 text-gray-500" />
                                </section>
                                <section className="flex items-center justify-center gap-2 ">
                                    <h2 className="text-base font-bold text-gray-600">
                                        {vet.name_vet}
                                    </h2>
                                    <span className="text-sm text-gray-500">
                                        {t(vet.veterinary_information?.specialty)}
                                    </span>
                                </section>

                                <section className="flex items-end justify-end flex-1 h-full ">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleOpenWhatsapp(
                                                vet.contact_vet?.whatsapp,
                                            )
                                        }
                                        className="flex flex-row gap-1 text-sm text-gray-500"
                                    >
                                        <PiWhatsappLogo className="w-5 h-5 text-primary-500" />
                                        {vet.contact_vet?.whatsapp}
                                        <BsFillSendExclamationFill className="w-5 h-5 ml-2" />
                                    </button>
                                </section>
                            </article>
                        ))}
                    </div>
                </section>
            </Modal>
        </>
    )
}

export default ModalSearchUberVet
