import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
//Import images

import cn from 'classnames'
import { useEffect, useState } from 'react'

import useResizeMobile from '~/hooks/use-resize-mobile'
import type { StepProps } from '~/types/helpers'
import { useModeEditablePet } from '../../use-zustand-hook'
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
        href: '#NewPet',
        Component: StepTutor,
    },
    {
        id: 3,
        title: 'Planos de Saúde',
        href: '#NewPet',
        Component: StepHealthInsurance,
    },
]

type VerticalTabsProps = {
    isPending: boolean
    hasTutor: boolean
    hasPet: boolean
}

const VerticalTabs = ({ isPending, hasTutor, hasPet }: VerticalTabsProps) => {
    const { isMobile } = useResizeMobile()
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

        setActiveVerticalTab(1)
        setPassedVerticalSteps([1])
    }, [mode])

    return (
        <div
            className="
                flex flex-col relative bg-transparent h-fit overflow-auto mobile:!w-full  mobile:!m-0 mobile:!p-0
                "
        >
            <div className="w-full flex justify-center items-center">
                <h4 className="card-title mb-2 !text-center font-semibold font-sans">
                    {hasPet ? 'Atualizar Pet' : 'Novo Pet'}
                </h4>
            </div>

            <div
                style={{ marginTop: isMobile ? '70px' : 0 }}
                className={cn(
                    'mb-4 step-arrow-nav',
                    {
                        'fixed top-0 left-0 right-0 z-[100] bg-white': isMobile,
                    },
                    'md:static',
                )}
            >
                <Nav className="nav-pills custom-nav nav-justified" role="tablist">
                    {items.map((item) => {
                        return (
                            <NavItem key={item.id}>
                                <NavLink
                                    href={item.href}
                                    disabled={!hasPet || mode !== 'readonly'}
                                    id="steparrow-gen-info-tab"
                                    className={cn({
                                        active: activeVerticalTab === item.id,
                                        done:
                                            activeVerticalTab <= items.length &&
                                            activeVerticalTab === item.id,
                                    })}
                                    onClick={() => {
                                        toggleVerticalTab(item.id)
                                    }}
                                >
                                    {item.title}
                                </NavLink>
                            </NavItem>
                        )
                    })}
                </Nav>
            </div>

            <TabContent activeTab={activeVerticalTab}>
                {items.map(({ id, Component }) => {
                    return (
                        <TabPane tabId={id} key={id}>
                            <Component
                                activeTab={activeVerticalTab}
                                toggleTab={toggleVerticalTab}
                                isPending={isPending}
                                tutorExist={hasTutor}
                            />
                        </TabPane>
                    )
                })}
            </TabContent>
        </div>
    )
}

export default VerticalTabs
