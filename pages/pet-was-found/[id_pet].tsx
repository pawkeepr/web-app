import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LayoutAuth from '~/Layouts/LayoutAuth'
import PetWasFound from '~/pages/Modules/shared/PetWasFound'
import { useGeolocationFoundPet } from '~/store/hooks/pet-by-id'
import type { IGeolocationAppointment } from '~/types/appointment'
import { decodeBase64 } from '~/utils/encode-base-64'
import { geolocation } from '~/utils/geolocation'

const PetWasFoundNext = () => {
    const router = useRouter()
    const { id_pet } = router.query
    const decode = decodeBase64(id_pet as string)
    const [location, setLocation] = useState<IGeolocationAppointment | null>(null)
    const [firstRender, setFirstRender] = useState(true)

    const { mutate } = useGeolocationFoundPet(decode as string)

    useEffect(() => {
        geolocation().then((geolocation) => setLocation(geolocation[0]))
    }, [])

    useEffect(() => {
        if (!location || !firstRender) return

        mutate(location)
        setFirstRender(false)
    }, [location, firstRender, mutate])

    return (
        <LayoutAuth>
            <PetWasFound id_pet={decode} />
        </LayoutAuth>
    )
}

export default PetWasFoundNext
