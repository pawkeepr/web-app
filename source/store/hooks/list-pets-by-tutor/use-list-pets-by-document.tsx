import type { BuilderEntity } from '~/entities/BuilderEntity'
import { Pet } from '~/entities/Pet'
import { PetSimplified } from '~/entities/PetSimplified'
import useMutationHelper from '~/hooks/use-mutation-helper'
import { createPet, createPetSimplified, getAllPets } from '~/services/helpers'
import { handleSubmitHelper } from '~/store/helpers/handle-submit-helper'
import type { IPet } from '~/types/pet'
import type { IPetV2 } from '~/types/pet-v2'
import useAppStore from '../use-app-store'

export const NAME = 'list-pets-of-tutor'

const ModePet = {
    SIMPLE: 'simple',
    FULL: 'full',
} as const
type ModePet = (typeof ModePet)[keyof typeof ModePet]

const createStrategy = new Map<ModePet, any>([
    [ModePet.SIMPLE, createPetSimplified],
    [ModePet.FULL, createPet],
])

const getStrategy = new Map<ModePet, any>([
    [ModePet.SIMPLE, getAllPets],
    [ModePet.FULL, getAllPets],
])

type IUseListPetsByDocument = {
    document: string
    strategy?: ModePet
    handleCloseModal?: () => void
    id_pet?: string
}

const entityStrategy = new Map<string, BuilderEntity>([
    [ModePet.SIMPLE, PetSimplified],
    [ModePet.FULL, Pet],
])

const useListPetsByDocument = ({
    document,
    strategy = ModePet.SIMPLE,
    handleCloseModal,
    id_pet,
}: IUseListPetsByDocument) => {
    const superKeys = [NAME, document]

    const create = createStrategy.get(strategy) || createPet
    const entity = entityStrategy.get(strategy) || Pet
    const get = getStrategy.get(strategy) || getAllPets

    return useAppStore<IPetV2[] | IPetV2, IPet | IPetV2>({
        get: get.bind(null, document, id_pet),
        add: create,
        entity: entity,
        keys: superKeys,
        name: NAME,
        handleCloseModal,
        enabled: !!document,
    })
}

export default useListPetsByDocument

type IUseCreateSimplePetMutation = Pick<IUseListPetsByDocument, 'document'>

export const useCreateSimplePetMutation = ({
    document,
}: IUseCreateSimplePetMutation) => {
    return useMutationHelper({
        mutationFn: async (data: IPetV2) => createPetSimplified(data),
        mutationKey: [document, NAME],
    })
}
type IUseHandleSubmitPetSimplified = Pick<IUseListPetsByDocument, 'document'> & {
    finallySubmit?: (data?: IPetV2) => void
}

export const handleSubmitPetSimplified = ({
    document,
    finallySubmit,
}: IUseHandleSubmitPetSimplified) => {
    const createdMutation = useCreateSimplePetMutation({ document })
    const updatedMutation = useCreateSimplePetMutation({ document })

    return (data: IPet) => {
        return handleSubmitHelper({
            createMutation: createdMutation,
            updateMutation: updatedMutation,
            data,
            entity: PetSimplified,
            onSubmit: (data) => finallySubmit?.(data as IPetV2),
        })
    }
}
