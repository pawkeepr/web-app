import type {
    IGeolocationAppointment,
    ISignatureAppointment,
} from '~/types/appointment'
import { browser } from './navigator.utils'

export type Geolocation = [IGeolocationAppointment, ISignatureAppointment]

export const geolocation = (): Promise<Geolocation> => {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            const browserUser = browser()

            const signature = {
                ip_address: '',
                browser_device: browserUser,
                operational_system: navigator.platform,
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const geolocationData = {
                        latitude: position.coords.latitude.toString(),
                        longitude: position.coords.longitude.toString(),
                        precision: position.coords.accuracy.toString(),
                        altitude: position.coords.altitude
                            ? position.coords.altitude.toString()
                            : '',
                        speed: position.coords.speed
                            ? position.coords.speed.toString()
                            : '',
                    }

                    return resolve([geolocationData, signature])
                },
                (error) => reject(error),
            )
        }
    })
}
