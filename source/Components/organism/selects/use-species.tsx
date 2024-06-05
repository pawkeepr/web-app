import { create } from 'zustand'
import { species, type SpeciesType } from '~/types/speciesType'

type State = {
    specie: SpeciesType
    optionsSpecies: SpeciesType[]
    onChangeSpecie: (species: SpeciesType) => void
}

export const useSpecies = create<State>((set) => ({
    specie: {
        label: 'unknown',
        value: 'unknown',
        breedType: [],
        bloodType: [],
    },
    optionsSpecies: species,
    onChangeSpecie: (species: SpeciesType) => {
        set((state) => ({ ...state, specie: species }))
    },
}))
