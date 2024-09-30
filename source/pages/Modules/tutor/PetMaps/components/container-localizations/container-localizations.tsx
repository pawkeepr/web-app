import { FaMapMarkerAlt } from 'react-icons/fa'
import { useGetReadQRCodeLocation } from '~/store/hooks/location'
import type { IGeolocationAppointment } from '~/types/appointment'

const CardLocalization = ({
    localization,
}: { localization: IGeolocationAppointment }) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${localization.latitude},${localization.longitude}`

    return (
        <div className="flex items-center w-full p-6 rounded-lg shadow-theme-3">
            <div className="p-4 rounded-full bg-primary-100">
                <FaMapMarkerAlt className="text-4xl text-primary-500" />
            </div>
            <div className="w-full ml-4 text-start">
                <h4 className="text-sm font-semibold text-gray-700">
                    {localization.address_complete}
                </h4>
                <p className="text-gray-600">
                    latitude {localization.latitude} | longitude{' '}
                    {localization.longitude}
                </p>
                <p className="text-gray-600">
                    <strong>Data:</strong>{' '}
                    {Intl.DateTimeFormat('pt-BR').format(
                        new Date(localization.date_geolocation),
                    )}
                </p>
                <div className="flex justify-end w-full">
                    <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 mt-2 text-blue-500 rounded-lg hover:text-blue-600 hover:bg-blue-50"
                    >
                        Abrir no Google Maps
                        <FaMapMarkerAlt className="inline-block ml-2 text-blue-500" />
                    </a>
                </div>
            </div>
        </div>
    )
}

type ContainerHealthPlansProps = {
    id_pet: string
}
const ContainerMapPet = ({ id_pet }: ContainerHealthPlansProps) => {
    if (!id_pet) return null

    const { data, isPending, isError } = useGetReadQRCodeLocation({ id_pet })

    return (
        <>
            {isPending && <div>Loading...</div>}

            {isError && <div>Error, tente novamente</div>}

            {data && data?.length > 0 && (
                <div className="space-y-4">
                    {data?.map((localization) => (
                        <CardLocalization
                            key={localization.latitude + localization.longitude}
                            localization={localization}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

export default ContainerMapPet
