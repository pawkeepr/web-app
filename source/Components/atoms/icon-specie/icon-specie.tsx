import { PiDogDuotone } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'
import type { BreedNames } from '~/types/breedType'
import { IconPets, type KeysIconPets } from '~/types/speciesType'

type IconSpecieProps = {
    specie?: KeysIconPets
    breed?: BreedNames
    className?: string
}

const IconSpecie = ({ specie, breed, className, ...props }: IconSpecieProps) => {
    const index = breed || specie || 'unknown'
    const Icon = IconPets[index as KeysIconPets] || PiDogDuotone
    return (
        <Icon
            {...props}
            className={twMerge('w-5 h-5', className)}
            aria-label={index}
        />
    )
}

export default IconSpecie
