import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
//Import images

import cn from 'classnames'
import { useState } from 'react'

import useResizeMobile from '~/hooks/use-resize-mobile'
import type { StepProps } from '~/types/helpers'
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

type VerticalTabsProps = Pick<StepProps, 'isPending' | 'tutorExist'>

const VerticalTabs = ({ isPending, tutorExist }: VerticalTabsProps) => {
    const { isMobile } = useResizeMobile()
    const [activeVerticalTab, setActiveVerticalTab] = useState(1)
    const [passedVerticalSteps, setPassedVerticalSteps] = useState([1])

    function toggleVerticalTab(tab: Tabs) {
        if (activeVerticalTab !== tab) {
            const modifiedSteps = [...passedVerticalSteps, tab]

            if (tab >= 1 && tab <= items.length) {
                setActiveVerticalTab(tab)
                setPassedVerticalSteps(modifiedSteps)
            }
        }
    }

    return (
        <div className="px-2 py-4 card  h-fit overflow-auto">
            <div className="w-full flex justify-center items-center">
                <h4 className="card-title mb-2 !text-center font-semibold font-sans">
                    Novo Pet
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
                                    disabled
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

            <div className="px-lg-4">
                <TabContent activeTab={activeVerticalTab}>
                    {items.map(({ id, Component }) => {
                        return (
                            <TabPane tabId={id} key={id}>
                                <Component
                                    activeTab={activeVerticalTab}
                                    toggleTab={toggleVerticalTab}
                                    isPending={isPending}
                                    tutorExist={tutorExist}
                                />
                            </TabPane>
                        )
                    })}
                </TabContent>
            </div>
        </div>
    )
}

export default VerticalTabs
