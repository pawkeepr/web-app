import type { Meta, StoryFn } from '@storybook/react'

import QrCodePet from './qr-code-pet.web'

QrCodePet.prototype.displayName = 'QrCodePet'

const meta = {
    title: 'Components/Molecules/QrCodePet',
    component: QrCodePet,

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
        id_pet: 'id_pet',
    },
} satisfies Meta<typeof QrCodePet>
export default meta
const Template: StoryFn<typeof QrCodePet> = (args) => <QrCodePet {...args} />

export const Default = Template.bind({})
Default.args = {}
