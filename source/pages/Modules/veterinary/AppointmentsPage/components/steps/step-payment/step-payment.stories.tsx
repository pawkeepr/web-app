import type { Meta, StoryFn } from '@storybook/react'

import { Formik } from 'formik'
import StepPayment from './step-payment'

const meta: Meta<typeof StepPayment> = {
    tags: ['autodocs'],
    component: StepPayment,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Steps/StepPayment',
    decorators: [
        (Story) => (
            <Formik
                enableReinitialize
                initialValues={{
                    appointment_details: {
                        payment: {
                            form_payment: {
                                value: 'credit_card',
                                label: 'Cartão de Crédito',
                            },
                            number_installments: 1,
                            value_payment: '0.00',
                        },
                    },
                }}
                onSubmit={() => {}}
            >
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof StepPayment>

export default meta

const Template: StoryFn<typeof StepPayment> = () => <StepPayment />

export const Default = Template.bind({})
Default.args = {}
