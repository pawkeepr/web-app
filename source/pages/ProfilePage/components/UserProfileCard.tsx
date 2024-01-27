import { CameraIcon } from '@heroicons/react/24/solid'
import { Input, Label } from 'reactstrap'
import AvatarPet from '~/Components/molecules/avatar-pet'
import { MapOptionSpecies, type Species } from '~/types/speciesType'
import CardContainer from './CardContainer'

type UserProfileCardProps = {
    title?: string
    subtitle?: string
    avatar?: string
    name?: string
    specie?: string
}

const UserProfileCard = ({
    avatar,
    name,
    specie,
    subtitle,
    title,
}: UserProfileCardProps) => {
    return (
        <CardContainer>
            <div className="p-1">
                <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                        <AvatarPet
                            src={avatar}
                            name_pet={name as string}
                            specie={
                                MapOptionSpecies[
                                    specie as keyof typeof MapOptionSpecies
                                ] as Species
                            }
                        />
                        <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                            <Input
                                disabled
                                id="profile-img-file-input"
                                type="file"
                                className="profile-img-file-input hover:!cursor-default"
                            />
                            <Label
                                htmlFor="profile-img-file-input"
                                className="profile-photo-edit avatar-xs "
                            >
                                <span
                                    data-tip="hello"
                                    className="avatar-title rounded-circle bg-light text-body hover:!cursor-default"
                                >
                                    <CameraIcon className="text-gray-300" />
                                </span>
                            </Label>
                        </div>
                    </div>
                    <h5 className="text-gray-700 mb-2 text-center w-full mt-1 capitalize">
                        <strong>{title}</strong>
                    </h5>
                    <p className="text-muted mb-0">{subtitle}</p>
                </div>
            </div>
        </CardContainer>
    )
}

export default UserProfileCard
