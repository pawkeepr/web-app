import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import MyImage from '~/Components/atoms/my-image'
import withControl from '~/Components/helpers/with-control'
import type { Species } from '~/types/speciesType'

export type AvatarPetProps = {
    src?: string
    alt?: string
    className?: string
    classNames?: {
        figure?: string
        img?: string
    }
} & (
    | {
          specie: Species
          name_pet: string
      }
    | {
          name_pet?: never
          specie?: 'human'
      }
)

const strategiesAvatar = new Map<Species, string>([
    ['bird', '/icon-pet/bird_primary.png'],
    ['cat', '/icon-pet/cat_primary.png'],
    ['dog', '/icon-pet/dog_primary.png'],
    ['fish', '/icon-pet/fish_primary.png'],
    ['equine', '/icon-pet/horse_primary.png'],
    ['rabbit', '/icon-pet/rabbit_primary.png'],
    ['lizard', '/icon-pet/reptile_primary.png'],
    ['rodent', '/icon-pet/rodent_primary.png'],
    ['pig', '/icon-pet/pig_primary.png'],
    ['bovine', '/icon-pet/cow_primary.png'],
    ['chicken', '/icon-pet/chicken_primary.png'],
    ['bovine', '/icon-pet/bovine_primary.png'],
    ['caprine', '/icon-pet/caprine_primary.png'],
    ['equine', '/icon-pet/equine_primary.png'],
    ['canine', '/icon-pet/canine_primary.png'],
    ['unknown', '/icon-pet/other_primary.png'],
])

const AvatarPet = ({
    specie,
    src,
    name_pet,
    className,
    alt,
    classNames,
}: AvatarPetProps) => {
    const link = useMemo(() => {
        const castedSrc = src?.replaceAll('*', '').trim().length
        if (castedSrc && castedSrc > 0) return src
        if (!specie) return '/icon-pet/other_primary.png'
        return (
            strategiesAvatar.get(specie as Species) ?? '/icon-pet/other_primary.png'
        )
    }, [src, specie])

    return (
        <figure className={twMerge('', className, classNames?.figure)}>
            <MyImage
                src={link}
                alt={alt || `Avatar do pet ${name_pet}`}
                className={twMerge(
                    'rounded-full w-32 h-32 mobile:w-16 mobile:h-16 object-cover',
                    classNames?.img,
                )}
            />
        </figure>
    )
}

export default withControl(AvatarPet)
