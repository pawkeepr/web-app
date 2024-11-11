import type { Meta, StoryObj } from '@storybook/react'

import AvatarPet from './avatar-pet'

const meta = {
    title: 'Components/Molecules/AvatarPet',
    component: AvatarPet,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AvatarPet>
export default meta
type Story = StoryObj<typeof AvatarPet>

export const Bird: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'bird',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Cat: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'cat',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Dog: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'dog',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Fish: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'fish',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Rabbit: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'rabbit',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Lizard: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'lizard',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Rodent: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'rodent',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Pig: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'pig',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Bovine: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'bovine',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Chicken: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'chicken',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Cow: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'cow',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Caprine: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'caprine',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Equine: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'equine',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Canine: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'canine',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Other: Story = {
    args: {
        name_pet: 'Test Pet',
        specie: 'unknown',
        alt: 'Avatar do pet Test Pet',
    },
}

export const Custom: Story = {
    args: {
        name_pet: 'Alfredo',
        src: '/icon-pet/custom.png',
        alt: 'Avatar do pet Alfredo',
    },
}