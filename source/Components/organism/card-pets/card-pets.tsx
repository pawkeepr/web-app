import {
    type ForwardRefExoticComponent,
    type RefAttributes,
    useMemo,
    useRef,
} from 'react'
import AvatarPet from '~/Components/molecules/avatar-pet'
import type { IHookModal } from '~/hooks/use-modal'
import useResizeMobile from '~/hooks/use-resize-mobile'
import { BreedNames } from '~/types/breedType'
import type { IPetV2Data } from '~/types/pet-v2'
import {
    type Gender,
    GenderBR,
    MapOptionSpecies,
    Species,
} from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import BoxButtonsPets from '../box-buttons-pets'
import ModalBoxButtonsPet from '../box-buttons-pets/modal-box-buttons-pets'
import { card } from '../card-scheduled'

type CardPetProps = {
    pet: IPetV2Data
    hasButtons?: boolean
}

const CardPet = ({ pet, hasButtons = true }: CardPetProps) => {
    const ref = useRef<ForwardRefExoticComponent<RefAttributes<IHookModal>>>(null)

    const { isMobile } = useResizeMobile()

    const item = useMemo(
        () => ({
            ...pet,
            specie: Species[pet?.specie as keyof typeof Species],
            race: BreedNames[pet?.race as keyof typeof BreedNames],
            sex: GenderBR[pet?.sex as Gender],
        }),
        [pet],
    )
    return (
        <article
            key={pet?.id}
            onClick={() => {
                if (!isMobile) return
                if (!ref?.current) return
                const castRef = ref.current as unknown as IHookModal
                castRef?.showModal?.()
            }}
            onKeyUp={() => { }}
            style={{
                cursor: isMobile ? 'pointer' : 'default',
                outline: 'none',
            }}
            className={card({
                isMobile,
                confirmed: 'yes',
                className: 'py-2'
            })}
        >
            <div className="flex-[2] flex-col items-center justify-center flex">
                <AvatarPet
                    name_pet={pet?.name_pet}
                    specie={
                        MapOptionSpecies[
                        pet.specie as keyof typeof MapOptionSpecies
                        ] as Species
                    }
                />
                <h1
                    className="text-center font-bold text-lg mobile:text-sm text-gray-400"
                >{`${pet?.name_pet}`} </h1>
                <h2 className="text-center text-xs">{calcAge(pet?.date_birth)} ano(s)</h2>
            </div>
            <div className="card-body mobile:text-xs text-sm mobile:py-4 px-0 m-0 flex-[3] font-sans">
                <div className="text-gray-500 space-y-1">
                    <div className="text-gray-500 ">
                        <h3 className="font-bold">Pet:</h3>
                        <p>{`${item?.specie}, ${item?.race}`}</p>
                    </div>
                    <div className="text-gray-500 ">
                        <h3 className="font-bold ">Sexo:</h3>
                        <p>{item.sex}</p>
                    </div>

                </div>

                <div className="card-actions mobile:hidden">
                    <BoxButtonsPets item={pet} condition={!isMobile && hasButtons} />
                    <ModalBoxButtonsPet
                        item={pet}
                        ref={ref}
                        condition={isMobile && hasButtons}
                    />
                </div>
            </div>
        </article>
    )
}

export default CardPet
