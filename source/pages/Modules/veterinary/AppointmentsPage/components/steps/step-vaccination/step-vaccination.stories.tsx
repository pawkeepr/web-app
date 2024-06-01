import type { Meta, StoryFn } from '@storybook/react'

import { Formik } from 'formik'
import StepVaccination from './step-vaccination'

const meta: Meta<typeof StepVaccination> = {
    tags: ['autodocs'],
    component: StepVaccination,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Steps/StepVaccination',
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof StepVaccination>

export default meta

const Template: StoryFn<typeof StepVaccination> = () => <StepVaccination />

export const Default = Template.bind({})
Default.args = {}
