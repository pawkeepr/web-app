import type { Meta, StoryFn } from '@storybook/react'
import { fn } from '@storybook/test'

import Tag from './tag'

const meta = {
    title: 'Components/Atoms/Tag',
    component: Tag,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
} satisfies Meta<typeof Tag>
export default meta
const Template: StoryFn<typeof Tag> = (args) => <Tag {...args} />

export const Default = Template.bind({})
Default.args = {
    name: 'tag',
    disabled: false,
    selected: true,
    onClick: fn(),
    children: 'Tag',
}
