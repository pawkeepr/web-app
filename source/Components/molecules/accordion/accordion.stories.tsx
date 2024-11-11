import type { Meta, StoryObj } from '@storybook/react'

import Accordion from './accordion'

const meta = {
    title: 'Components/Molecules/Accordion',
    component: Accordion,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],

} satisfies Meta<typeof Accordion>
export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
    args: {
        title: 'Accordion Title',
        children: <div>Accordion Content</div>,
    }
}