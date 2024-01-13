/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import useResizeMobile from '~/hooks/use-resize-mobile'
import StepScheduledAll from '../steps/step-scheduled-all'

const Tabs = () => [
    {
        id: 1,
        title: 'Todos os agendamentos',
        href: '#scheduled',
        tab: <StepScheduledAll />,
    },
]

const HorizontalTabs = () => {
    const [categories, setCategories] = useState(() => Tabs())

    const { isMobile } = useResizeMobile()

    useEffect(() => {
        if (isMobile) {
            setCategories(Tabs().slice(0, 3))
        } else {
            setCategories(Tabs())
        }
    }, [isMobile])

    return (
        <div className="w-full mt-2">
            <Tab.Group>
                <Tab.List className="flex  rounded-sm bg-primary-500 p-1">
                    {categories.map((category) => (
                        <Tab
                            key={category.id}
                            className={({ selected }) =>
                                cn(
                                    'w-full rounded-sm py-2.5 text-sm leading-5 font-bold text-white uppercase',
                                    'ring-white/60 ring-offset-2 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-white !text-secondary-500 shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12]  hover:text-white',
                                )
                            }
                        >
                            {category.title}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {categories.map((item) => (
                        <Tab.Panel
                            key={item.id}
                            className={cn(
                                'rounded-xl bg-white p-3',
                                'ring-white/60 ring-offset-2 focus:outline-none focus:ring-2',
                            )}
                        >
                            {item.tab}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default HorizontalTabs
