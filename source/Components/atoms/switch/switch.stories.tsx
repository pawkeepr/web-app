import type { Meta, StoryObj } from '@storybook/react'

import Toggle from './switch'

const meta: Meta<typeof Toggle> = {
    component: Toggle,
    title: 'Components/Atoms/Switch',
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Primary: Story = {
    args: {
        mode: 'editable',
        color: 'primary',
    },
}

export const Secondary: Story = {
    args: {
        mode: 'editable',
        color: 'secondary',
    },
}
