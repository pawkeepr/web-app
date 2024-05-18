import type { Meta, StoryObj } from '@storybook/react'

import { Formik } from 'formik'
import ControlToggle, { type ToggleProps } from './control-toggle'

const Template = (args: ToggleProps) => <ControlToggle {...args} />

const meta: Meta<typeof Template> = {
    component: ControlToggle,
    tags: ['autodocs'],
    title: 'Components/Molecules/ControlToggle',
    decorators: [
        (Story) => (
            <Formik
                enableReinitialize
                initialValues={{
                    toggle: undefined,
                }}
                onSubmit={() => {}}
                initialErrors={{}}
            >
                <Story />
            </Formik>
        ),
    ],
}

export default meta
type Story = StoryObj<typeof Template>

export const NoContent: Story = {
    args: {
        name: 'toggle' as '',
        label: 'Toggle',
        mode: 'editable',
    },
}

export const WithContent: Story = {
    args: {
        name: 'toggle' as '',
        label: 'Toggle',
        mode: 'editable',
        content: <div>Content</div>,
    },
}
