import type { Meta, StoryFn } from '@storybook/react'

import { fn } from '@storybook/test'
import { Formik } from 'formik'
import OptionsSpecies from './options-species'

OptionsSpecies.prototype.displayName = 'OptionsSpecies'

const meta: Meta<typeof OptionsSpecies> = {
    tags: ['autodocs'],
    component: OptionsSpecies,
    title: 'Modules/Veterinary/AppointmentsPage/Components/Molecules/OptionsSpecies',
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
    args: {
        onChange: fn(),
    },
} satisfies Meta<typeof OptionsSpecies>

export default meta

const Template: StoryFn<typeof OptionsSpecies> = (args) => (
    <OptionsSpecies {...args} />
)

export const Default = Template.bind({})
Default.args = {}
