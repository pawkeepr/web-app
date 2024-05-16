import type { Meta, StoryFn } from '@storybook/react'
import { fn } from '@storybook/test'

import { Formik } from 'formik'
import {
    QuestionTypes,
    questions,
    type KeyOfQuestionTypes,
} from '~/constants/anamnese-questions'
import ListSwitch, { type ListInputProps } from './list-switch'

const meta: Meta<typeof ListSwitch> = {
    tags: ['autodocs'],
    component: ListSwitch,
    title: 'Components/Organism/ListSwitch',
    args: { onChange: fn() },
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof ListSwitch>

export default meta

const Template: StoryFn<ListInputProps> = (args) => <ListSwitch {...args} />

export const Anamnese = Template.bind({})
Anamnese.args = {
    ctx: {
        anamnesis: [],
    },
    name: 'anamnesis' as any,
    items: questions,
    onChange: fn(),
    categories: Object.keys(QuestionTypes) as KeyOfQuestionTypes[],
}
