import { PiDogDuotone } from 'react-icons/pi'
import type { ObjectBreed } from '~/types/breedType'
import { IconPets, type KeysIconPets } from '~/types/speciesType'

type IconSpecieProps = {
    specie?: KeysIconPets
    breed?: ObjectBreed
}

const IconSpecie = ({ specie, breed }: IconSpecieProps) => {
    const index = breed || specie || 'unknown'
    const Icon = IconPets[index as KeysIconPets] || PiDogDuotone
    return <Icon className="w-5 h-5 " />
}

export default IconSpecie
