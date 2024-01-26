// path/filename: src/pages/Profile.tsx

import type React from 'react'
import HorizontalTabs from '~/Components/organism/horizontal-list/horizontal-list'
import DashboardLayouts from '../_layouts/dashboard/dashboard'
import FormChangePass from './components/Forms/ChangePass'
import FormPersonalData from './components/Forms/PersonalData'
import FormProfissionalExperiencie from './components/Forms/ProfessionalExperience'
import SocialLinks from './components/SocialLinks'
import UserProfileCard from './components/UserProfileCard'

type OptionTab = {
    id: number
    title: string
    href: string
    tab: JSX.Element
}

const makeTabs = (): OptionTab[] => {
    return [
        {
            id: 1,
            title: 'Dados Pessoais',
            href: '#personal-data',
            tab: <FormPersonalData />,
        },
        {
            id: 2,
            title: 'Alterar Senha',
            href: '#change-pass',
            tab: <FormChangePass />,
        },
        {
            id: 3,
            title: 'Experiência Profissional',
            href: '#professional-experience',
            tab: <FormProfissionalExperiencie />,
        },
    ]
}

const Profile: React.FC = () => {
    const tabs = makeTabs()
    return (
        <DashboardLayouts title="Perfil" searchBlock={false}>
            <div className="container mx-auto mt-14">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full web:w-1/4 px-4">
                        <UserProfileCard />
                        <SocialLinks />
                    </div>
                    <div className="w-full web:w-3/4 px-4 mt-10 web:mt-0">
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <HorizontalTabs categories={tabs} />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayouts>
    )
}

export default Profile
