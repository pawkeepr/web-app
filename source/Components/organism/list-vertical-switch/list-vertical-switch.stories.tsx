import type { Meta, StoryFn } from '@storybook/react'
import { fn } from '@storybook/test'

import { Formik } from 'formik'
import {
    QuestionTypes,
    TKeysOfQuestionTypes,
    questions,
    type KeyOfQuestionTypes,
} from '~/constants/anamnese-questions'
import ListVerticalSwitch, { type ListInputProps } from './list-vertical-switch'

const meta: Meta<typeof ListVerticalSwitch> = {
    tags: ['autodocs'],
    component: ListVerticalSwitch,
    title: 'Components/Organism/ListVerticalSwitch',
    args: { onChange: fn() },
    decorators: [
        (Story) => (
            <Formik enableReinitialize initialValues={[]} onSubmit={() => {}}>
                <Story />
            </Formik>
        ),
    ],
} satisfies Meta<typeof ListVerticalSwitch>

export default meta

const Template: StoryFn<ListInputProps> = (args) => <ListVerticalSwitch {...args} />

export const Anamnese = Template.bind({})
Anamnese.args = {
    ctx: {
        anamnesis: [],
    },
    name: 'anamnesis' as any,
    items: questions,
    onChange: fn(),
    categories: Object.keys(QuestionTypes).map((key) => {
        const type = key as KeyOfQuestionTypes
        return {
            value: type,
            label: TKeysOfQuestionTypes[type],
        }
    }),
}
