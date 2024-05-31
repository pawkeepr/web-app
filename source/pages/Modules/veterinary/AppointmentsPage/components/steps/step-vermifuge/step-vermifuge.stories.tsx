import type { Meta, StoryFn } from '@storybook/react'

import { Formik } from 'formik'
import StepVermifuge from './step-vermifuge'

const meta: Meta<typeof StepVermifuge> = {
    tags: ['autodocs'],
    component: StepVermifuge,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Steps/StepVermifuge',
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof StepVermifuge>

export default meta

const Template: StoryFn<typeof StepVermifuge> = () => <StepVermifuge />

export const Default = Template.bind({})
Default.args = {}
