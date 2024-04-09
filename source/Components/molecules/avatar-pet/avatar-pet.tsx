import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import MyImage from '~/Components/atoms/my-image'
import type { Species } from '~/types/speciesType'
type AvatarPetProps = {
    src?: string
    specie?: Species
    name_pet: string
    className?: string
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

const AvatarPet = ({ specie, src, name_pet, className }: AvatarPetProps) => {
    const link = useMemo(() => {
        if (src) return src
        if (!specie) return '/icon-pet/other_primary.png'
        return strategiesAvatar.get(specie) ?? '/icon-pet/other_primary.png'
    }, [src, specie])

    return (
        <figure className={twMerge("", className)}>
            <MyImage
                src={link}
                alt={`Avatar do pet ${name_pet}`}
                className="rounded-full w-40 h-40 mobile:w-16 mobile:h-16 object-cover"
            />
        </figure>
    )
}

export default AvatarPet
