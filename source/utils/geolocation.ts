import { IGeolocationAppointment, ISignatureAppointment } from "~/store/slices/appointment-vet/types";
import { browser } from "./navigator.utils";

type Geolocation = [IGeolocationAppointment, ISignatureAppointment]

export const geolocation = (): Promise<Geolocation> => {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            const browserUser = browser();

            const signature = {
                ip_address: '',
                browser_device: browserUser,
                operational_system: navigator.platform
            }

            navigator.geolocation.getCurrentPosition(function (position) {
                const geolocationData = {
                    latitude: position.coords.latitude.toString(),
                    longitude: position.coords.longitude.toString(),
                    precision: position.coords.accuracy.toString(),
                    altitude: position.coords.altitude ? position.coords.altitude.toString() : '',
                    speed: position.coords.speed ? position.coords.speed.toString() : '',
                };

                return resolve([geolocationData, signature]);
            }, function (error) {
                return reject(error);
            });
        }
    })
};