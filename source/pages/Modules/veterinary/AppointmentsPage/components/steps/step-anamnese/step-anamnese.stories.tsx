import type { Meta, StoryFn } from '@storybook/react'

import { Formik } from 'formik'
import StepAnamnese from './step-anamnese'

const meta: Meta<typeof StepAnamnese> = {
    tags: ['autodocs'],
    component: StepAnamnese,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Steps/StepAnamnese',
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof StepAnamnese>

export default meta

const Template: StoryFn<typeof StepAnamnese> = () => <StepAnamnese />

export const Default = Template.bind({})
Default.args = {}
