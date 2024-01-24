import { useMemo } from 'react'
import MyImage from '~/Components/atoms/my-image'
import type { Species } from '~/types/speciesType'

type AvatarPetProps = {
    src?: string
    specie?: Species
    name_pet: string
}

const strategiesAvatar = new Map<Species, string>([
    ['bird', '/icon-pet/bird_primary.png'],
    ['cat', '/icon-pet/cat_primary.png'],
    ['dog', '/icon-pet/dog_primary.png'],
    ['fish', '/icon-pet/fish_primary.png'],
    ['horse', '/icon-pet/horse_primary.png'],
    ['rabbit', '/icon-pet/rabbit_primary.png'],
    ['reptile', '/icon-pet/reptile_primary.png'],
])

const AvatarPet = ({ specie, src, name_pet }: AvatarPetProps) => {
    const link = useMemo(() => {
        if (src) return src
        if (!specie) return '/icon-pet/other_primary.png'
        return strategiesAvatar.get(specie) ?? '/icon-pet/other_primary.png'
    }, [src, specie])

    return (
        <picture className="mobile:w-full flex flex-1 justify-center items-center">
            <MyImage
                src={link}
                alt={`Avatar do pet ${name_pet}`}
                width={160}
                height={160}
                className="rounded-full"
            />
        </picture>
    )
}

export default AvatarPet
