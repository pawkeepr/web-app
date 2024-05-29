import type { Meta, StoryFn } from '@storybook/react'

import { Formik } from 'formik'
import ContentActionExam from './content-action-exam'

const meta: Meta<typeof ContentActionExam> = {
    tags: ['autodocs'],
    component: ContentActionExam,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Molecules/ContentActionExam',
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof ContentActionExam>

export default meta

const Template: StoryFn<typeof ContentActionExam> = (args) => (
    <ContentActionExam {...args} />
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
    name: 'exams_anamnesis.complementary_exams',
    label: 'Ultrassonografia / Radiologia',
}
