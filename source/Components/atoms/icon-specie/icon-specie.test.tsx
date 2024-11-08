import { render, screen } from '@testing-library/react'
import {
    GiChicken,
    GiGoat,
    GiReptileTail,
    GiSeatedMouse,
    GiSnakeTongue,
    GiTurtle,
} from 'react-icons/gi'
import {
    PiBirdDuotone,
    PiCatDuotone,
    PiCowDuotone,
    PiDogDuotone,
    PiFishDuotone,
    PiHorseDuotone,
    PiPiggyBankDuotone,
    PiRabbitDuotone,
} from 'react-icons/pi'
import { describe, expect, it } from 'vitest'
import { IconPets } from '~/types/speciesType'
import IconSpecie from './icon-specie'
describe('IconSpecie component (Unit)', () => {
    it('should render the default icon when no specie or breed is provided', () => {
        render(<IconSpecie data-testid="icon-specie" />)
        const icon = screen.getByTestId('icon-specie')
        expect(icon).toBeInTheDocument()
    })

    it('should render the correct icon based on the specie prop', () => {
        render(<IconSpecie specie="dog" data-testid="icon-specie" />)
        const icon = screen.getByTestId('icon-specie')
        expect(icon).toBeInTheDocument()
        expect(icon).toHaveAttribute('aria-label', 'dog') // verifica se o ícone do "dog" é renderizado/ verifica se o ícone padrão é renderizado
    })

    it('should render the correct icon based on the breed prop', () => {
        render(<IconSpecie breed="labrador_retriever" data-testid="icon-specie" />)
        const icon = screen.getByTestId('icon-specie')
        expect(icon).toBeInTheDocument()
    })

    it('should the correct icon based on the specie and breed prop', () => {
        expect(IconPets.dog).equal(PiDogDuotone)
        expect(IconPets.cat).equal(PiCatDuotone)
        expect(IconPets.rabbit).equal(PiRabbitDuotone)
        expect(IconPets.fish).equal(PiFishDuotone)
        expect(IconPets.bird).equal(PiBirdDuotone)
        expect(IconPets.chicken).equal(GiChicken)
        expect(IconPets.equine).equal(PiHorseDuotone)
        expect(IconPets.bovine).equal(PiCowDuotone)
        expect(IconPets.chelonians).equal(GiTurtle)
        expect(IconPets.serpent).equal(GiSnakeTongue)
        expect(IconPets.lizard).equal(GiReptileTail)
        expect(IconPets.pig).equal(PiPiggyBankDuotone)
        expect(IconPets.caprine).equal(GiGoat)
        expect(IconPets.rodent).equal(GiSeatedMouse)
    })
})
