import { useMemo } from 'react'
import { Veterinary } from '~/entities/Veterinary'
import useProfile from '~/store/hooks/profile/use-profile'

const useProfileVeterinary = () => {
    const { data: profile } = useProfile()

    const veterinary = useMemo(() => {
        if (!profile) return {} as Veterinary

        return Veterinary.build(profile)
    }, [profile])

    return veterinary
}

export default useProfileVeterinary
