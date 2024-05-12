import type { Meta, StoryFn } from '@storybook/react'

import { BtnCompose, type BtnProps } from './btn'

export default {
    title: 'Components/Atoms/Btn',
    component: BtnCompose,
} as Meta

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
