import type { Meta, StoryObj } from '@storybook/react'

import { Formik } from 'formik'
import ControlToggle3States, {
    type ControlToggle3StatesProps,
} from './control-toggle-3-states'

const Template = (args: ControlToggle3StatesProps<{ toggle: '' }>) => (
    <Formik
        enableReinitialize
        initialValues={{
            toggle: undefined,
        }}
        onSubmit={() => {}}
        initialErrors={{}}
    >
        <ControlToggle3States {...args} />
    </Formik>
)

const meta: Meta<typeof Template> = {
    component: Template,
    title: 'Components/Molecules/ControlToggle3States',
}

export default meta
type Story = StoryObj<typeof Template>

export const Default: Story = {
    args: {
        name: 'toggle',
        initialValue: null,
        label: 'Toggle',
        mode: 'editable',
    },
}
