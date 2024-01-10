import { BtnAvatar } from '~/Components/atoms/btn'

type AvatarPetProps = {
    name: string
}

const AvatarPet = ({ name }: AvatarPetProps) => {
    return (
        <div>
            <BtnAvatar alt="Avatar do Pet" name="pet.avatar" disabled size={40} />
            <h5 className="text-center text-muted">{name}</h5>
        </div>
    )
}

export default AvatarPet
