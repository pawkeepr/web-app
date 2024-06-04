//Import images

import { useEffect, useState } from 'react'

import { Tab } from '@headlessui/react'
import { tv } from 'tailwind-variants'
import type { StepProps } from '~/types/helpers'
import { useModeEditablePet } from '../hooks/use-mode-editable-pet'
import { StepHealthInsurance, StepPet, StepTutor } from '../steps'

type Tabs = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

type TabItem = {
    id: Tabs
    title: string
    href: string
    Component: (props: StepProps) => JSX.Element
}

const items: TabItem[] = [
    {
        id: 1,
        title: 'Pet',
        href: '#NewPet',
        Component: StepPet,
    },
    {
        id: 2,
        title: 'Tutor',
        href: '#NewTutor',
        Component: StepTutor,
    },
    {
        id: 3,
        title: 'Planos de Saúde',
        href: '#NewHealthInsurance',
        Component: StepHealthInsurance,
    },
]

type VerticalTabsProps = {
    isPending: boolean
    hasTutor: boolean
    hasPet: boolean
}

const tab = tv({
    base: `
        flex items-center justify-center flex-grow w-1/3 transition-transform
        bg-transparent h-full
    `,
    variants: {
        selected: {
            true: 'text-primary-500',
        },
    },
})

const buttonTab = tv({
    // Ajuste os estilos base e variantes conforme necessário
    base: `
        rounded-none  flex-grow w-1/3 
        focus:outline-none focus:ring-0
        font-bold text-gray-500 py-2
        text-sm flex web:flex-row items-center justify-center
        gap-1 flex-grow 
        transition-transform duration-300 ease-in-out
    `,
    // Ajustes adicionais para os estilos mobile
    variants: {
        selected: {
            true: 'text-gray-100 bg-primary-500  shadow-2xl transform mobile:scale-105 ',
            false: '',
        },
        disabled: {
            true: '!text-gray-600 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-gray-600',
        },
    },
})

const menu = tv({
    base: `
        relative
        w-full 
        bg-[#f6dda3] shadow-2xl mobile:!overflow-visible 
        rounded-md
        flex items-center justify-between overflow-hidden
        transition-transform duration-500 ease-in-out
    `,
})

const VerticalTabs = ({ isPending, hasTutor, hasPet }: VerticalTabsProps) => {
    const [activeVerticalTab, setActiveVerticalTab] = useState(1)
    const [passedVerticalSteps, setPassedVerticalSteps] = useState([1])
    const { mode } = useModeEditablePet()

    function toggleVerticalTab(tab: Tabs) {
        if (activeVerticalTab !== tab) {
            const modifiedSteps = [...passedVerticalSteps, tab]

            if (tab >= 1 && tab <= items.length) {
                setActiveVerticalTab(tab)
                setPassedVerticalSteps(modifiedSteps)
            }
        }
    }

    useEffect(() => {
        if (mode === 'readonly') {
            return
        }

        setActiveVerticalTab(0)
        setPassedVerticalSteps([0])
    }, [mode])

    return (
        <div
            className="
                flex flex-col relative bg-transparent h-fit overflow-auto 
                mobile:!w-full mobile:!m-0 mobile:!p-0
                tablet:!w-full tablet:!m-0 tablet:!p-0 tablet:!flex-col
                "
        >
            <div className="flex items-center justify-center w-full">
                <h4 className="text-lg text-gray-600 my-2 !text-center font-bold font-sans">
                    {hasPet ? 'Editar Pet' : 'Novo Pet'}
                </h4>
            </div>
            <Tab.Group
                selectedIndex={activeVerticalTab}
                onChange={setActiveVerticalTab}
            >
                <div className={menu()}>
                    <Tab.List className={tab()}>
                        {items.map((item, index) => {
                            return (
                                <Tab
                                    key={item.id}
                                    disabled={!hasPet || mode !== 'readonly'}
                                    id="steparrow-gen-info-tab"
                                    className={buttonTab({
                                        selected: activeVerticalTab === index,
                                    })}
                                >
                                    {item.title}
                                </Tab>
                            )
                        })}
                    </Tab.List>
                </div>

                {items.map(({ id, Component }) => {
                    return (
                        <Tab.Panel key={id}>
                            <Component
                                activeTab={activeVerticalTab}
                                toggleTab={toggleVerticalTab}
                                isPending={isPending}
                                tutorExist={hasTutor}
                            />
                        </Tab.Panel>
                    )
                })}
            </Tab.Group>
        </div>
    )
}

export default VerticalTabs
