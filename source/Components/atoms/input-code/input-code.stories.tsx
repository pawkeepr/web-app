import type { Meta, StoryFn } from '@storybook/react'
import { fn } from '@storybook/test'

import InputCode from './input-code'

const meta = {
    title: 'Components/Atoms/InputCode',
    component: InputCode,
    parameters: {
        layout: 'centered',
    },
    args: { onClick: fn() },
    tags: ['autodocs'],
} satisfies Meta<typeof InputCode>
export default meta
const Template: StoryFn<typeof InputCode> = (args) => <InputCode {...args} />

export const Default = Template.bind({})
Default.args = {
    color: 'primary',
}
