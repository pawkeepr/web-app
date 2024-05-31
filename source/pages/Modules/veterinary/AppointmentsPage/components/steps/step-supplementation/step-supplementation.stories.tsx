import type { Meta, StoryFn } from '@storybook/react'

import { Formik } from 'formik'
import StepSupplementation from './step-supplementation'

const meta: Meta<typeof StepSupplementation> = {
    tags: ['autodocs'],
    component: StepSupplementation,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Steps/StepSupplementation',
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof StepSupplementation>

export default meta

const Template: StoryFn<typeof StepSupplementation> = () => <StepSupplementation />

export const Default = Template.bind({})
Default.args = {}
