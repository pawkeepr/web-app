import type { Meta, StoryObj } from '@storybook/react'

import Toggle from './switch'

const meta: Meta<typeof Toggle> = {
    component: (args) => (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-start gap-2">
                <Toggle {...args} size="sm" id="sm" />
                <label className="text-sm font-semibold text-gray-600" htmlFor="sm">
                    sm
                </label>
            </div>
            <div className="flex items-center justify-start gap-2">
                <Toggle {...args} size="md" id="md" />
                <label className="text-sm font-semibold text-gray-600" htmlFor="md">
                    md
                </label>
            </div>
            <div className="flex items-center justify-start gap-2">
                <Toggle {...args} size="lg" id="lg" />
                <label className="text-sm font-semibold text-gray-600" htmlFor="lg">
                    lg
                </label>
            </div>
            <div className="flex items-center justify-start gap-2">
                <Toggle {...args} size="xl" id="xl" />
                <label className="text-sm font-semibold text-gray-600" htmlFor="xl">
                    xl
                </label>
            </div>
        </div>
    ),
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
