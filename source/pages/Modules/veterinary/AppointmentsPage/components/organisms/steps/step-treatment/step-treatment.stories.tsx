import type { Meta, StoryFn } from '@storybook/react'

import { Formik } from 'formik'
import StepTreatment from './step-treatment'

const meta: Meta<typeof StepTreatment> = {
    tags: ['autodocs'],
    component: StepTreatment,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Organisms/Steps/StepTreatment',
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof StepTreatment>

export default meta

const Template: StoryFn<typeof StepTreatment> = () => <StepTreatment />

export const Default = Template.bind({})
Default.args = {}
