import type { Meta, StoryObj } from '@storybook/react'

import { Formik } from 'formik'
import validate from '~/validations/activate'
import { makeInitialValues } from '../../../ActivationAccount'
import type { StepProps } from '../types'
import StepSchedule from './step-schedule'

const Template = ({
    nextStep = () => {},
    prevStep = () => {},
    ...args
}: StepProps) => (
    <Formik
        enableReinitialize
        validationSchema={validate}
        initialValues={makeInitialValues('teste@example.com')}
        onSubmit={() => {}}
        initialErrors={{}}
    >
        <StepSchedule {...args} nextStep={nextStep} prevStep={prevStep} />
    </Formik>
)

const meta: Meta<typeof Template> = {
    component: Template,
    title: 'Modules/Veterinary/Authentication/ActivationAccount/Steps/StepSchedule',
}

export default meta
type Story = StoryObj<typeof Template>

export const Default: Story = {
    args: {
        prevStep: () => {},
        nextStep: () => {},
    },
}
