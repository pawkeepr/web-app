//Import images

import { useEffect, useMemo, useState } from 'react'

import { Tab } from '@headlessui/react'
import { tv } from 'tailwind-variants'
import useProfile from '~/store/hooks/profile/use-profile'
import type { StepProps, TabsOptions } from '~/types/helpers'
import { useModeEditablePet } from '../hooks/use-mode-editable-pet'
import { StepHealthInsurance, StepPet, StepTutor } from '../steps'

type TabItem = {
    id: TabsOptions
    title: string
    href: string
    Component: (props: StepProps) => JSX.Element
}

const itemsVet: TabItem[] = [
    {
        id: 0,
        title: 'Pet',
        href: '#NewPet',
        Component: StepPet,
    },
    {
        id: 1,
        title: 'Tutor',
        href: '#NewTutor',
        Component: StepTutor,
    },
    {
        id: 2,
        title: 'Planos de Saúde',
        href: '#NewHealthInsurance',
        Component: StepHealthInsurance,
    },
]

const itemsTutor: TabItem[] = [
    {
        id: 0,
        title: 'Pet',
        href: '#NewPet',
        Component: StepPet,
    },
    {
        id: 1,
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
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { mode } = useModeEditablePet()
    const [fistRender, setFirstRender] = useState(true)

    const { data: profile, isPending: profilePending } = useProfile()

    const items = useMemo(() => {
        if (profilePending) {
            return []
        }
        return profile?.type_profile === 2 ? itemsTutor : itemsVet
    }, [profile, profilePending])

    const nextStep = () => {
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1))
    }

    const prevStep = () => {
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
    }

    useEffect(() => {
        if (mode === 'readonly') {
            return
        }

        if (fistRender) {
            setFirstRender(false)
            setSelectedIndex(0)
        }
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
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <div className={menu()}>
                    <Tab.List className={tab()}>
                        {items.map((item, index) => {
                            return (
                                <Tab
                                    key={item.id}
                                    id="steparrow-gen-info-tab"
                                    className={buttonTab({
                                        selected: selectedIndex === index,
                                    })}
                                >
                                    {item.title}
                                </Tab>
                            )
                        })}
                    </Tab.List>
                </div>
                <Tab.Panels>
                    {items.map(({ id, Component }) => {
                        return (
                            <Tab.Panel key={id}>
                                <Component
                                    activeTab={selectedIndex}
                                    nextStep={nextStep}
                                    prevStep={prevStep}
                                    isPending={isPending}
                                    tutorExist={hasTutor}
                                />
                            </Tab.Panel>
                        )
                    })}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default VerticalTabs
