import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
//Import images

import cn from 'classnames'
import { useMemo, useState } from 'react'

import { usePathname } from 'next/navigation'
import { FaEdit, FaEye } from 'react-icons/fa'
import { BtnIcon } from '~/Components/atoms/btn'
import { ModeInput } from '~/Components/molecules/field-control/field-control'
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
    const { onChangeMode, mode } = useModeEditablePet()
    const pathname = usePathname()
    function toggleVerticalTab(tab: Tabs) {
        if (activeVerticalTab !== tab) {
            const modifiedSteps = [...passedVerticalSteps, tab]

            if (tab >= 1 && tab <= items.length) {
                setActiveVerticalTab(tab)
                setPassedVerticalSteps(modifiedSteps)
            }
        }
    }

    const changeMode = () => {
        if (mode === ModeInput.readonly) return onChangeMode('editable')

        onChangeMode(ModeInput.readonly)
    }

    const isRouteCreate = useMemo(
        () => pathname === '/dashboard/pets/new',
        [pathname],
    )

    return (
        <div className="flex flex-col relative bg-transparent h-fit overflow-auto">
            <div className="w-full flex justify-center items-center">
                <h4 className="card-title mb-2 !text-center font-semibold font-sans">
                    {hasPet ? 'Atualizar Pet' : 'Novo Pet'}
                </h4>
            </div>
            <BtnIcon
                icon={
                    mode === 'editable' ? (
                        <span>
                            <FaEye className="w-5 h-5" />
                        </span>
                    ) : (
                        <span>
                            <FaEdit className="w-5 h-5" />
                        </span>
                    )
                }
                condition={!isRouteCreate}
                type="button"
                className="absolute right-0 top-0 w-fit p-1 m-0 h-fit text-gray-400 border-none hover:!bg-transparent"
                label={mode === 'editable' ? 'Visualizar' : 'Editar'}
                onClick={changeMode}
            />

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
                                    disabled={!hasPet}
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
