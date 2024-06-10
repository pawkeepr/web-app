import type { Meta, StoryFn } from '@storybook/react'

import CardFeedPet from './card-feed-pets'

CardFeedPet.prototype.displayName = 'CardFeedPet'

const meta = {
    title: 'Components/Organism/CardFeedPet',
    component: CardFeedPet,

    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {
        pet: {
            name_pet: 'Rex',
            specie: 'dog',
            cpf_cnpj: '123.456.789-00',
            id_pet: '1',
            race: 'poodle',
            sex: 'male',
        },
    },
} satisfies Meta<typeof CardFeedPet>
export default meta
const Template: StoryFn<typeof CardFeedPet> = (args) => <CardFeedPet {...args} />

export const Default = Template.bind({})
Default.args = {}
