import type { Meta, StoryObj } from '@storybook/react'

import { Formik } from 'formik'
import ControlToggle, { type ToggleProps } from './control-toggle'

const Template = (args: ToggleProps) => (
    <Formik
        enableReinitialize
        initialValues={{
            toggle: true,
        }}
        onSubmit={() => {}}
        initialErrors={{}}
    >
        <ControlToggle {...args} />
    </Formik>
)

const meta: Meta<typeof Template> = {
    component: Template,
    title: 'Components/Molecules/ControlToggle',
}

export default meta
type Story = StoryObj<typeof Template>

export const Default: Story = {
    args: {
        label: 'Toggle',
        name: 'toggle',
    },
}
