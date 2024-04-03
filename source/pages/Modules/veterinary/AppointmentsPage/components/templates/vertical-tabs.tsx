import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

import cn from 'classnames'
import { useState } from 'react'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { tv } from 'tailwind-variants'
import { BtnIcon } from '~/Components/atoms/btn'
import withLoading from '~/Components/helpers/with-loading'
import ModalConfirm from '~/Components/modals/confirm-modal'
import type { StepProps, Tabs } from '~/types/helpers'
import StepAnamneses from '../organisms/steps/step-anamnese'
import StepGeral from '../organisms/steps/step-geral'
import StepPayment from '../organisms/steps/step-payment'
import StepTreatment from '../organisms/steps/step-treatment'

type TabItem = {
    id: Tabs
    title: string
    href: string
    Component: (props: StepProps) => JSX.Element
}

const items: TabItem[] = [
    {
        id: 1,
        title: 'Inicio',
        href: '#Inicio',
        Component: StepGeral,
    },
    {
        id: 2,
        title: 'Anamnese',
        href: '#Anamnese',
        Component: StepAnamneses,
    },
    {
        id: 3,
        title: 'Tratamento',
        href: '#Treatment',
        Component: StepTreatment,
    },
    {
        id: 4,
        title: 'Finalizar',
        href: '#Finalizar',
        Component: StepPayment,
    },
]

const tab = tv({
    // Ajuste os estilos base e variantes conforme necessário
    base: `
        w-full mobile:py-4
        font-bold text-white
        mobile:text-xs
        text-sm flex web:flex-row items-center justify-center
        mobile:flex-col gap-2  !rounded-none
        mobile:border border-primary-500
        `,
    // Ajustes adicionais para os estilos mobile
    variants: {
        selected: {
            true: '!bg-secondary-500 !text-gray-600 shadow',
            false: 'text-blue-100 ',
        },
        disabled: {
            true: '!text-gray-600 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-gray-600',
            false: 'text-blue-100 ',
        },
    },
})

const VerticalTabs = () => {
    const [activeVerticalTab, setActiveVerticalTab] = useState(1)
    const [passedVerticalSteps, setPassedVerticalSteps] = useState([1])
    const router = useRouter()

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
        <section>
            <ModalConfirm
                title="Cancelar Consulta!"
                onConfirm={() => router.push('/dashboard')}
                description="Importante!"
                message="Esta ação irá cancelar todas as operações realizadas até o momento, deseja continuar?"
            >
                {({ onChangeOpen }) => {
                    return (
                        <div className="w-full bg-primary-500 rounded-t-sm justify-end flex p-0 py-1">
                            <BtnIcon
                                type="button"
                                icon={
                                    <XMarkIcon className="font-extrabold text-secondary-400 hover:bg-red-500 rounded-sm" />
                                }
                                className="w-fit !p-0 !m-0 h-fit"
                                onClick={() => onChangeOpen(true)}
                                aria-label="Close modal"
                            />
                        </div>
                    )
                }}
            </ModalConfirm>
            <div
                className={cn(
                    `
                        mobile:fixed mobile:bottom-0 mobile:left-0 mobile:right-0 
                        h-fit z-[100] bg-white mobile:border-t-2 border-primary-500
                    `,
                )}
            >
                <Nav className="nav-pills nav-justified" role="tablist">
                    {items.map((item) => {
                        return (
                            <NavItem key={item.id}>
                                <NavLink
                                    href={item.href}
                                    id="steparrow-gen-info-tab"
                                    className={tab({
                                        selected: activeVerticalTab === item.id,
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

            <TabContent
                activeTab={activeVerticalTab}
                className="relative border border-secondary-500 shadow-lg px-4 py-2 bg-white mobile:!shadow-none mobile:!rounded-none mobile:m-0 mobile:px-4 rounded-t-none"
            >
                {items.map(({ id, Component }, index) => {
                    return (
                        <TabPane tabId={id} key={`${id}-${index}`}>
                            <Component
                                activeTab={activeVerticalTab}
                                toggleTab={toggleVerticalTab}
                            />
                        </TabPane>
                    )
                })}
            </TabContent>
        </section>
    )
}

export default withLoading(VerticalTabs)
