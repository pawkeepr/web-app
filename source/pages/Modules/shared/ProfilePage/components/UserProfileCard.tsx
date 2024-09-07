import AvatarModal from '~/Components/modals/avatar-modal'
import { useMutationUpdateProfilePhoto } from '~/store/hooks/profile/use-profile'
import type { Species } from '~/types/speciesType'
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

export default UserProfileCard
