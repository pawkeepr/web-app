import { BtnAvatar } from '~/Components/atoms/btn'
import type { AvatarImageProps } from '~/Components/atoms/btn/btn-avatar'

type TitleAvatarProps = {
    name: string
}

type AvatarPetProps = Omit<AvatarImageProps, 'title'> & {
    name: string
    key?: string
    alt?: string
    title?: (props: TitleAvatarProps) => React.ReactNode
}

const AvatarPet = ({
    name,
    key = 'pet.avatar',
    size = 40,
    disabled = true,
    alt = 'Avatar do Pet',
    title = (props) => <h5 className="text-center text-muted">{props.name}</h5>,
    ...rest
}: AvatarPetProps) => {
    const Title = title

    return (
        <div>
            <BtnAvatar
                alt={alt}
                name={key}
                disabled={disabled}
                size={size}
                {...rest}
            />
            <Title name={name} />
        </div>
    )
}

export default AvatarPet
