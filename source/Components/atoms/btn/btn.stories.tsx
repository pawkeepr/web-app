import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
// import { expect, fn, within } from '@storybook/test'

import { Btn } from './btn'

const meta = {
    title: 'Components/Atoms/Button',
    component: Btn,
    parameters: {
        layout: 'centered',
    },
    args: { onClick: fn() },
    tags: ['autodocs', 'stable'],
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
} satisfies Meta<typeof Btn>

export default meta
type Story = StoryObj<typeof Btn>

export const Primary: Story = {
    args: {
        color: 'primary',
        label: 'Primary Button',
        isLoading: false,
        condition: true,
    },
}

export const Secondary: Story = {
    args: {
        color: 'secondary',
        label: 'Secondary Button',
        isLoading: false,
        condition: true,
    },
}

export const Confirm: Story = {
    args: {
        color: 'confirm',
        label: 'Confirm Button',
        isLoading: false,
        condition: true,
    },
}

export const Neutral: Story = {
    args: {
        color: 'neutral',
        label: 'Neutral Button',
        isLoading: false,
        condition: true,
    },
}
