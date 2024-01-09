/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Tab } from '@headlessui/react';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import useResizeMobile from '~/hooks/use-resize-mobile';
import StepScheduledAll from '../steps/step-scheduled-all';
import StepScheduledCanceled from '../steps/step-scheduled-canceled';
import StepScheduledConfirmed from '../steps/step-scheduled-confirmed';
import StepScheduledDone from '../steps/step-scheduled-done';
import StepScheduledRescheduled from '../steps/step-scheduled-rescheduled';

const Tabs = () => [
    {
        id: 1,
        title: 'Consultas Agendadas',
        href: '#scheduled',
        tab: <StepScheduledAll />,
    },
    {
        title: 'Consultas Reagendadas',
        href: '#rescheduled',
        tab: <StepScheduledRescheduled />,
    },
    {
        id: 3,
        title: 'Consultas Canceladas',
        href: '#canceled',
        tab: <StepScheduledCanceled />,
    },
    {
        id: 4,
        title: 'Consultas Confirmadas',
        href: '#confirmed',
        tab: <StepScheduledConfirmed />,
    },
    {
        id: 5,
        title: 'Consultas Finalizadas',
        href: '#done',
        tab: <StepScheduledDone />,
    },
];

const HorizontalTabs = () => {
    const [categories, setCategories] = useState(() => Tabs());

    const { isMobile } = useResizeMobile();

    useEffect(() => {
        if (isMobile) {
            setCategories(Tabs().slice(0, 3));
        } else {
            setCategories(Tabs());
        }
    }, [isMobile]);

    return (
        <div className="w-full mt-2 rounded-md">
            <Tab.Group>
                <Tab.List className="flex  rounded-xl bg-primary-500 p-1">
                    {categories.map((category) => (
                        <Tab
                            key={category.id}
                            className={({ selected }) =>
                                cn(
                                    'w-full rounded-lg py-2.5 text-sm leading-5 font-bold text-white',
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
                    {categories.map((item, idx) => (
                        <Tab.Panel
                            key={idx}
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
    );
};

export default HorizontalTabs;
