import type { Meta, StoryFn } from '@storybook/react'

import { Formik } from 'formik'
import StepExams from './step-physical-exam'

const meta: Meta<typeof StepExams> = {
    tags: ['autodocs'],
    component: StepExams,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Steps/StepPhysicalExam',
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof StepExams>

export default meta

const Template: StoryFn<typeof StepExams> = () => <StepExams />

export const Default = Template.bind({})
Default.args = {}
