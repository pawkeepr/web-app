import type { Meta, StoryObj } from '@storybook/react'
import Tabs from './tabs'

import { Formik } from 'formik'
import type { IPetV2 } from '~/types/pet-v2'
import type { DTOProfile } from '~/types/profile'
import { makeInitialValues } from '../../../Appointments'
import { schemaStepAppointment } from '../../validations.yup'

const meta: Meta<typeof Tabs> = {
    component: Tabs,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Tabs',
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Formik
                enableReinitialize
                validationSchema={schemaStepAppointment}
                initialValues={makeInitialValues(
                    {} as IPetV2,
                    {} as DTOProfile,
                    'id',
                )}
                onSubmit={() => {}}
                initialErrors={{}}
            >
                <Story />
            </Formik>
        ),
    ],
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
    args: {},
}
