import type { Meta, StoryFn } from '@storybook/react'

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
const Template: StoryFn<typeof Accordion> = (args) => <Accordion {...args} />

export const Default = Template.bind({})
Default.args = {
    title: 'Accordion Title',
    children: <div>Accordion Content</div>,
}