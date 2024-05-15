import type { Meta, StoryFn } from '@storybook/react'
import { fn } from '@storybook/test'

import { BtnCompose, type BtnProps } from './btn'

BtnCompose.prototype.displayName = 'Btn'

const meta = {
    title: 'Components/Atoms/Button',
    component: BtnCompose,

    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        color: {
            description: 'The color of the button',
            type: {
                name: 'string',
                raw: "'primary' | 'secondary' | 'confirm' | 'neutral'",
                required: false,
            },
            options: ['primary', 'secondary', 'confirm', 'neutral'],
            control: {
                type: 'select',
                labels: {
                    primary: 'Primary',
                    secondary: 'Secondary',
                    confirm: 'Confirm',
                    neutral: 'Neutral',
                },
            },
        },
        isLoading: {
            control: {
                type: 'boolean',
            },
        },
        condition: {
            control: {
                type: 'boolean',
            },
        },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onClick: fn() },
} satisfies Meta<typeof BtnCompose>
export default meta
const Template: StoryFn<BtnProps> = (args) => <BtnCompose {...args} />

export const Primary = Template.bind({})
Primary.args = {
    color: 'primary',
    label: 'Primary Button',
    isLoading: false,
    condition: true,
}

export const Secondary = Template.bind({})
Secondary.args = {
    color: 'secondary',
    label: 'Secondary Button',
    isLoading: false,
    condition: true,
}

export const Confirm = Template.bind({})
Confirm.args = {
    color: 'confirm',
    label: 'Confirm Button',
    isLoading: false,
    condition: true,
}

export const Neutral = Template.bind({})
Neutral.args = {
    color: 'neutral',
    label: 'Neutral Button',
    isLoading: false,
    condition: true,
}
