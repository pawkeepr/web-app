/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Tab } from '@headlessui/react';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import useResizeMobile from '~/hooks/use-resize-mobile';
import PetsTab from '~/pages/PetsPage/PetsTab';
import TutorsTab from '~/pages/TutorsPage/TutorsTab';

const Tabs = () => [
    {
        id: 1,
        title: 'Pets',
        href: '#pets',
        tab: <PetsTab />,
    },
    {
        title: 'Tutores',
        href: '#tutors',
        tab: <TutorsTab />,
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
        <div className="mt-2 rounded-md">
            <Tab.Group>
                <Tab.List className="flex rounded-xl bg-primary-500 p-1">
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
                <Tab.Panels className="mt-2 w-full">
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
