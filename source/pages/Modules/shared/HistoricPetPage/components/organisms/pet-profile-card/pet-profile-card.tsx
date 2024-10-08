import AvatarModal from '~/Components/modals/avatar-modal'
import { useTranslations } from '~/hooks/use-translations'
import CardContainer from '~/pages/Modules/shared/ProfilePage/components/CardContainer'
import { useMutationUpdateProfilePhoto } from '~/store/hooks/pet-by-id/use-pet-profile'
import type { IPetV2 } from '~/types/pet-v2'
import type { Species } from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'

type PetProfileCardProps = {
    disabled?: boolean
} & Pick<IPetV2, 'id' | 'main_responsible_guardian' | 'pet_information'>

const PetProfileCard = ({
    pet_information,
    main_responsible_guardian,
    id,
    disabled = false,
}: PetProfileCardProps) => {
    const { t } = useTranslations('common')

    const { mutateAsync, onProgress, isPending } = useMutationUpdateProfilePhoto({
        id,
        main_responsible_guardian,
    })

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
                            disabled={
                                isPending || !pet_information?.name_pet || disabled
                            }
                            isLoading={isPending}
                            src={pet_information?.url_img as string}
                            name_pet={pet_information?.name_pet}
                            specie={pet_information?.specie as Species}
                        />
                    </div>
                    {pet_information && (
                        <>
                            <h5 className="w-full mt-1 mb-2 text-center text-gray-700 capitalize">
                                <strong>
                                    {`${pet_information?.name_pet}, 
                            ${t(pet_information?.specie as string)}, 
                            ${t(pet_information?.race as string)}`}
                                </strong>
                            </h5>
                            <p className="mb-0 text-muted">
                                {`
                        ${t(pet_information?.sex as string)},
                        ${calcAge(pet_information?.date_birth)} ano(s)
                        `}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </CardContainer>
    )
}

export default PetProfileCard
