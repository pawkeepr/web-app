import type { Meta, StoryObj } from '@storybook/react'

import { Formik } from 'formik'
import ControlToggle3States from './control-toggle-3-states'

const meta: Meta<typeof ControlToggle3States> = {
    component: ControlToggle3States,
    tags: ['autodocs'],
    title: 'Components/Molecules/ControlToggle3States',
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
type Story = StoryObj<typeof ControlToggle3States>

export const NoContent: Story = {
    args: {
        name: 'toggle' as '',
        initialValue: null,
        label: 'Toggle',
        mode: 'editable',
    },
}

export const WithContent: Story = {
    args: {
        name: 'toggle' as '',
        initialValue: null,
        label: 'Toggle',
        mode: 'editable',
        content: <div>Content</div>,
    },
}
