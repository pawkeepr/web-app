import type { Meta, StoryFn } from '@storybook/react'

import { Formik } from 'formik'
import ContentActionVaccination from './content-action-vaccination'

const meta: Meta<typeof ContentActionVaccination> = {
    tags: ['autodocs'],
    component: ContentActionVaccination,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Molecules/ContentActionVaccination',
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof ContentActionVaccination>

export default meta

const Template: StoryFn<typeof ContentActionVaccination> = (args) => (
    <ContentActionVaccination {...args} />
)

export const Default = Template.bind({})
Default.args = {
    option: {
        type: 'biochemistry',
        value: 1,
        label: 'Ultrassonografia / Radiologia',
        type_action: null,
        checked: true,
    },
}
