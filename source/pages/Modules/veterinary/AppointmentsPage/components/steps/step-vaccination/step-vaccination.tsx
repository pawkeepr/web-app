import { useState } from 'react'
import type { KeyOfMapOptionSpecies } from '~/types/speciesType'
import CardSimplePet from '../../molecules/card-simple-pet'
import OptionsSpecies from '../../molecules/options-species'
import { screen } from '../styles'

const StepVaccination = () => {
    const [specie, setSpecie] = useState<KeyOfMapOptionSpecies>('dog')

    return (
        <>
            <CardSimplePet />
            <h4 className="font-sans text-base font-semibold text-center capitalize">
                Plano de Vacinação
            </h4>
            <div className={screen()}>
                <OptionsSpecies
                    onChange={(item) => {
                        setSpecie(item.value as KeyOfMapOptionSpecies)
                    }}
                />
            </div>
        </>
    )
}

export default StepVaccination
