import type { Meta, StoryFn } from '@storybook/react'
import { fn } from '@storybook/test'
import React from 'react'

import Tag from './tag'

Tag.prototype.displayName = 'Tag'

const meta = {
    title: 'Components/Atoms/Tag',
    component: Tag,

    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
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
