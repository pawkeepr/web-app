import type { Meta, StoryObj } from '@storybook/react'

import { Formik } from 'formik'
import CheckBoxIsMultiModalGroup, {
    CheckboxIsMultiModalProps,
} from './checkbox-is-multi-modal-group'

const Template = (args: CheckboxIsMultiModalProps<{ toggle: '' }>) => (
    <Formik
        enableReinitialize
        initialValues={{
            toggle: undefined,
        }}
        onSubmit={() => {}}
        initialErrors={{}}
    >
        <CheckBoxIsMultiModalGroup {...args} />
    </Formik>
)

const meta: Meta<typeof Template> = {
    component: Template,
    title: 'Components/Organism/CheckBoxIsMultiModalGroup',
}

export default meta
type Story = StoryObj<typeof Template>

export const Default: Story = {
    args: {
        name: 'toggle',
        label: 'Select an items',
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
            const value = values as string[]
            return value.length > 0
        }
    },
}
