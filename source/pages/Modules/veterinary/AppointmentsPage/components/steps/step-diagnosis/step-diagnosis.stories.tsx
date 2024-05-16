import type { Meta, StoryFn } from '@storybook/react'

import { Formik } from 'formik'
import StepDiagnosis from './step-diagnosis'

const meta: Meta<typeof StepDiagnosis> = {
    tags: ['autodocs'],
    component: StepDiagnosis,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Steps/StepDiagnosis',
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof StepDiagnosis>

export default meta

const Template: StoryFn<typeof StepDiagnosis> = () => <StepDiagnosis />

export const Default = Template.bind({})
Default.args = {}
