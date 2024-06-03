import type { Meta, StoryFn } from '@storybook/react'

import { Formik } from 'formik'
import * as Yup from 'yup'
import LOADING from '~/constants/loading'
import ConfirmAccountForm from './confirm-account-form'

const validationSchema = Yup.object({
    email: Yup.string().email().required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
    digit0: Yup.string()
        .required('Campo obrigatório')
        .min(1, 'Campo obrigatório')
        .max(1, 'Campo obrigatório'),
    digit1: Yup.string()
        .required('Campo obrigatório')
        .min(1, 'Campo obrigatório')
        .max(1, 'Campo obrigatório'),
    digit2: Yup.string()
        .required('Campo obrigatório')
        .min(1, 'Campo obrigatório')
        .max(1, 'Campo obrigatório'),
    digit3: Yup.string()
        .required('Campo obrigatório')
        .min(1, 'Campo obrigatório')
        .max(1, 'Campo obrigatório'),
    digit4: Yup.string()
        .required('Campo obrigatório')
        .min(1, 'Campo obrigatório')
        .max(1, 'Campo obrigatório'),
    digit5: Yup.string()
        .required('Campo obrigatório')
        .min(1, 'Campo obrigatório')
        .max(1, 'Campo obrigatório'),
})

const meta: Meta<typeof ConfirmAccountForm> = {
    tags: ['autodocs'],
    component: ConfirmAccountForm,
    title: 'Components/Form/ConfirmAccountForm',
    decorators: [
        (Story) => (
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    email: 'teste@teste.com',
                    password: 'teste@teste',
                    digit0: '',
                    digit1: '',
                    digit2: '',
                    digit3: '',
                    digit4: '',
                    digit5: '',
                }}
                onSubmit={(data) => {
                    console.log(data)
                }}
            >
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof ConfirmAccountForm>

export default meta

const Template: StoryFn<typeof ConfirmAccountForm> = (args) => (
    <ConfirmAccountForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
    isLoading: LOADING.IDLE,
}
