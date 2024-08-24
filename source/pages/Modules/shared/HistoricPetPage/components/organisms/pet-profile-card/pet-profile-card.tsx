import { CameraIcon } from '@heroicons/react/24/solid'
import { Input, Label } from 'reactstrap'
import AvatarModal from '~/Components/modals/avatar-modal'
import CardContainer from '~/pages/Modules/shared/ProfilePage/components/CardContainer'
import { useMutationUpdateProfilePhoto } from '~/store/hooks/profile/use-profile'
import type { Species } from '~/types/speciesType'

type PetProfileCardProps = {
    title?: string
    subtitle?: string
    avatar?: string
    name?: string
    specie?: string
}

const PetProfileCard = ({
    avatar,
    name,
    specie,
    subtitle,
    title,
}: PetProfileCardProps) => {
    const { mutateAsync, onProgress, isPending } = useMutationUpdateProfilePhoto()

    return (
        <CardContainer className="mt-2 bg-white">
            <div className="p-1">
                <div className="text-center">
                    <div className="mx-auto mb-4 profile-user position-relative d-inline-block">
                        <AvatarModal
                            progress={onProgress}
                            classNames={{
                                img: '!w-40 !h-40',
                            }}
                            onSave={async (file) => {
                                await mutateAsync(file)
                            }}
                            isLoading={isPending}
                            src={avatar}
                            name_pet={name as string}
                            specie={specie as Species}
                        />
                        <div className="p-0 avatar-xs rounded-circle profile-photo-edit">
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
                                    <CameraIcon className="text-gray-300 " />
                                </span>
                            </Label>
                        </div>
                    </div>
                    <h5 className="w-full mt-1 mb-2 text-center text-gray-700 capitalize">
                        <strong>{title}</strong>
                    </h5>
                    <p className="mb-0 text-muted">{subtitle}</p>
                </div>
            </div>
        </CardContainer>
    )
}

export default PetProfileCard
