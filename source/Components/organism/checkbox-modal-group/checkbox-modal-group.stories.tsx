import type { Meta, StoryObj } from '@storybook/react'

import { Formik } from 'formik'
import { CheckboxIsMultiModalProps } from '../checkbox-is-multi-modal-group'
import CheckBoxModalGroup from './checkbox-modal-group'

const Template = (args: CheckboxIsMultiModalProps<{ toggle: '' }>) => (
    <Formik
        enableReinitialize
        initialValues={{
            toggle: undefined,
        }}
        onSubmit={() => {}}
        initialErrors={{}}
    >
        <CheckBoxModalGroup {...args} />
    </Formik>
)

const meta: Meta<typeof Template> = {
    component: Template,
    title: 'Components/Organism/CheckBoxModalGroup',
}

export default meta
type Story = StoryObj<typeof Template>

export const Default: Story = {
    args: {
        name: 'toggle',
        label: 'Select an item',
        required: true,
        disabledError: false,
        items: [
            {
                label: 'Item 1',
                value: 'item1',
            },
            {
                label: 'Item 2',
                value: 'item2',
            },
        ],
        validateSync: (values: unknown) => {
            const value = values as string
            return value?.trim()?.length > 0
        }
    },
}
