import { useMemo } from 'react';
import { Veterinary } from '~/entities/Veterinary';
import useProfile from '~/store/hooks/profile/use-profile';

const useProfileVeterinary = () => {
    const { data: profile } = useProfile();

    const veterinary = useMemo(() => {
        if (!profile) return {} as Veterinary;

        return Veterinary.build({
            id: profile.id,
            name_veterinary: profile.user_information?.name,
            email: profile.user_information?.contact.email,
            phone: profile.user_information?.contact.phone,
            street: profile.user_information?.address.street,
            city: profile.user_information?.address.city,
            state: profile.user_information?.address.state,
            country: profile.user_information?.address.country,
            whatsapp: profile.user_information?.contact.whatsapp,
            cpf_cnpj: profile.cpf_cnpj,
            crmv: profile.crmv,
            neighborhood: profile.user_information?.address.neighborhood,
            specialty: profile.specialty_information?.specialty,
        });
    }, [profile]);

    return veterinary;
};

export default useProfileVeterinary;
