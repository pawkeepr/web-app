import type { Meta, StoryFn } from '@storybook/react'

import { useState } from 'react'
import MenuHorizontalTabs, { type ItemTab } from './menu-horizontal-tabs'

type TabItem = {
    id: number
    title: string
    href: string
    Component: JSX.Element
}

const items: TabItem[] = [
    {
        id: 0,
        title: 'Início',
        href: '#Inicio',
        Component: <></>,
    },
    {
        id: 1,
        title: 'Anamnese',
        href: '#Anamnese',
        Component: <></>,
    },
    {
        id: 2,
        title: 'Exames Realizados',
        href: '#Exams',
        Component: <></>,
    },
    {
        id: 3,
        title: 'Solicitar Exames',
        href: '#Exams',
        Component: <></>,
    },
    {
        id: 4,
        title: 'Vacinação  e Vermefugo',
        href: '#Treatment',
        Component: <></>,
    },
    {
        id: 5,
        title: 'Medicação',
        href: '#Treatment',
        Component: <></>,
    },
    {
        id: 6,
        title: 'Demais Tratamentos',
        href: '#Treatment',
        Component: <></>,
    },
    {
        id: 7,
        title: 'Diagnóstico',
        href: '#Diagnostic',
        Component: <></>,
    },
    // {
    //     id: 8,
    //     title: 'Finalizar',
    //     href: '#Finalizar',
    //     Component: StepPayment,
    // },
]

const meta: Meta<typeof MenuHorizontalTabs> = {
    tags: ['autodocs'],
    component: MenuHorizontalTabs,
    title: 'Components/Organism/MenuHorizontalTabsV2',
    decorators: [
        (Story) => {
            const [activeItem, setActiveItem] = useState<ItemTab>(items[0])
            const onTabClick = (index: ItemTab) => {
                const newIndex = items.find((i) => i.id === index.id) as ItemTab
                setActiveItem(newIndex)
            }

            return (
                <Story
                    args={{
                        activeItem: activeItem,
                        onClick: onTabClick,
                        items: items,
                    }}
                />
            )
        },
    ],
} satisfies Meta<typeof MenuHorizontalTabs>

export default meta

const Template: StoryFn<typeof MenuHorizontalTabs> = (args) => (
    <MenuHorizontalTabs {...args} />
)

export const Default = Template.bind({})
Default.args = {
    items: items,
    activeItem: items[0],
}
