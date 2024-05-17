import type { Meta, StoryFn } from '@storybook/react'
import { fn } from '@storybook/test'

import { Formik } from 'formik'
import { exams } from '~/constants/exams-questions'
import ListHorizontalSwitch, { type ListInputProps } from './list-horizontal-switch'

import type { IconType } from 'react-icons'
import {
    GiBodyBalance,
    GiChemicalDrop,
    GiHealthNormal,
    GiRadiations,
    GiShieldBash,
    GiTestTubes,
} from 'react-icons/gi'
import type { KeyOfExamsTypes } from '~/constants'

const STEPS: {
    label: string
    value: KeyOfExamsTypes
    icon?: IconType
}[] = [
    { label: 'Hematologia', value: 'hematology', icon: GiTestTubes },
    { label: 'Bioquímica', value: 'biochemistry', icon: GiChemicalDrop },
    { label: 'Parasitologia', value: 'parasitology', icon: GiChemicalDrop },
    { label: 'Imunologia', value: 'immunology', icon: GiShieldBash },
    { label: 'Urinálise', value: 'urinalysis', icon: GiChemicalDrop },
    { label: 'Local da Lesão', value: 'lesion_location', icon: GiBodyBalance },
    {
        label: 'Ultrassonografia / Radiologia',
        value: 'ultrasound_radiology',
        icon: GiRadiations,
    },
    {
        label: 'Descrição de Lesões',
        value: 'lesion_description',
        icon: GiHealthNormal,
    },
]

const meta: Meta<typeof ListHorizontalSwitch> = {
    tags: ['autodocs'],
    component: ListHorizontalSwitch,
    title: 'Components/Organism/ListHorizontalSwitch',
    args: { onChange: fn() },
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof ListHorizontalSwitch>

export default meta

const Template: StoryFn<ListInputProps> = (args) => (
    <ListHorizontalSwitch {...args} />
)

export const Anamnese = Template.bind({})
Anamnese.args = {
    ctx: {
        exams: [],
    },
    name: 'exams' as any,
    items: exams.map((item) => ({
        ...item,
        value: item.id,
        checked: false,
    })),
    onChange: fn(),
    categories: STEPS,
}
