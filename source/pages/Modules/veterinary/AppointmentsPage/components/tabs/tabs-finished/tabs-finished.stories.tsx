import type { Meta, StoryObj } from '@storybook/react'
import TabsFinished from './tabs-finished'

import { Formik } from 'formik'
import type { IPetV2 } from '~/types/pet-v2'
import type { DTOProfile } from '~/types/profile'
import { makeInitialValues } from '../../../Appointments'
import { schemaStepAppointment } from '../../validations.yup'

const meta: Meta<typeof TabsFinished> = {
    component: TabsFinished,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Templates/TabsFinished',
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
type Story = StoryObj<typeof TabsFinished>

export const Default: Story = {
    args: {},
}
