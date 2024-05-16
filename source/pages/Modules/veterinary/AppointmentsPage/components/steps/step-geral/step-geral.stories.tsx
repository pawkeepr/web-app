import type { Meta, StoryFn } from '@storybook/react'

import { Formik } from 'formik'
import StepGeral from './step-geral'

const meta: Meta<typeof StepGeral> = {
    tags: ['autodocs'],
    component: StepGeral,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Steps/StepGeral',
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof StepGeral>

export default meta

const Template: StoryFn<typeof StepGeral> = () => <StepGeral />

export const Default = Template.bind({})
Default.args = {}
