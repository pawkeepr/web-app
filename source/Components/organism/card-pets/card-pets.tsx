import { useRef, type ForwardRefExoticComponent, type RefAttributes } from 'react'
import AvatarPet from '~/Components/molecules/avatar-pet'
import type { IHookModal } from '~/hooks/use-modal'
import useResizeMobile from '~/hooks/use-resize-mobile'
import type { IPetV2Data } from '~/types/pet-v2'
import { GenderBR, MapOptionSpecies, type Species } from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import BoxButtonsPets from '../box-buttons-pets'
import ModalBoxButtonsPet from '../box-buttons-pets/modal-box-buttons-pets'
import { card } from '../card-scheduled'

type CardPetProps = {
    pet: IPetV2Data
}

const CardPet = ({ pet }: CardPetProps) => {
    const ref = useRef<ForwardRefExoticComponent<RefAttributes<IHookModal>>>(null)

    const { isMobile } = useResizeMobile()

    return (
        <article
            key={pet?.id_pet}
            onClick={() => {
                if (!isMobile) return
                if (!ref?.current) return
                const castRef = ref.current as unknown as IHookModal
                castRef?.showModal?.()
            }}
            onKeyUp={() => {}}
            className={card({
                isMobile,
            })}
        >
            <AvatarPet
                name_pet={pet?.name_pet}
                specie={
                    MapOptionSpecies[
                        pet.specie as keyof typeof MapOptionSpecies
                    ] as Species
                }
            />
            {isMobile && (
                <div className="text-gray-700 mb-2 text-center w-full mt-1 capitalize">
                    <strong>
                        <p>
                            {`${pet?.name_pet}, ${pet?.specie}, ${pet?.race}, ${
                                GenderBR[pet?.sex as keyof typeof GenderBR]
                            }`}
                            {', '}
                            {calcAge(pet?.date_birth)} ano(s)
                        </p>
                    </strong>
                </div>
            )}
            <div className="flex flex-col flex-[2] mobile:flex-1 w-full ">
                <div className="flex mobile:gap-3 justify-around items-center mt-4 px-2">
                    {!isMobile && (
                        <section className="justify-center flex items-start flex-col flex-1">
                            <div className="text-gray-700 mb-2 mobile:text-center w-full mt-1 capitalize">
                                <strong>
                                    <p>
                                        {`${pet?.name_pet}, ${pet?.specie}, ${pet?.race}`}
                                    </p>
                                </strong>
                            </div>
                            <div className="text-gray-500  mobile:text-center w-full mt-1">
                                <h3 className="font-bold mb-1">Sexo:</h3>
                                <p>{GenderBR[pet?.sex as keyof typeof GenderBR]}</p>
                            </div>
                            <div className="text-gray-500  mobile:text-center w-full mt-1">
                                <h3 className="font-bold mb-1">Idade:</h3>
                                <p>{calcAge(pet?.date_birth)} ano(s)</p>
                            </div>
                        </section>
                    )}

                    <section className="justify-center flex flex-1 items-start flex-col gap-2 ">
                        {!isMobile && (
                            <>
                                <div className="text-gray-500 ">
                                    <h3 className="font-bold mb-1">Castrado?</h3>
                                    <p>{pet?.castrated || 'Não Informado'} </p>
                                </div>
                            </>
                        )}
                        <div className="text-gray-500 ">
                            <h3 className="font-bold mb-1">Tipo Sanguíneo:</h3>
                            <p>{pet?.blood_type || 'Desconhecido'}</p>
                        </div>
                        <div className="text-gray-500 ">
                            <h3 className="font-bold mb-1">Doador de Órgãos:</h3>
                            <p>{pet?.blood_donator || 'Não'}</p>
                        </div>
                        {isMobile && (
                            <div className="text-gray-500 ">
                                <h3 className="font-bold mb-1">Castrado?</h3>
                                <p>{pet?.castrated || 'Não Informado'} </p>
                            </div>
                        )}
                    </section>
                </div>
                {!isMobile && <BoxButtonsPets item={pet} />}
                {isMobile && <ModalBoxButtonsPet item={pet} ref={ref} />}
            </div>
        </article>
    )
}

export default CardPet
