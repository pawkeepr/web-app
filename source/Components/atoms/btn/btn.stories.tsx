import type { Meta, StoryFn } from '@storybook/react'
import { fn } from '@storybook/test'

import { BtnCompose, type BtnProps } from './btn'

const meta = {
    title: 'Components/Atoms/Button',
    component: BtnCompose,
    parameters: {
        layout: 'centered',
    },
    args: { onClick: fn() },
    tags: ['autodocs'],
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
    },
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
