// path/filename: src/pages/Profile.tsx

import type React from 'react'
import { useMemo } from 'react'
import HorizontalTabs from '~/Components/organism/horizontal-list/horizontal-list'
import useProfile from '~/store/hooks/profile/use-profile'
import type { IProfile } from '~/types/profile'
import DashboardLayouts from '../../_layouts/dashboard/dashboard'
import FormChangePass from './components/Forms/ChangePass'
import FormPersonalData from './components/Forms/PersonalData'
import SocialLinks from './components/SocialLinks'
import UserProfileCard from './components/UserProfileCard'

type OptionTab = {
    id: number
    title: string
    href: string
    tab: JSX.Element
}

type InstagramProfilePreviewProps = {
    username: string
}

const makeTabs = (profile: IProfile): OptionTab[] => {
    return [
        {
            id: 1,
            title: 'Dados Pessoais',
            href: '#personal-data',
            tab: <FormPersonalData data={profile} />,
        },
        {
            id: 2,
            title: 'Alterar Senha',
            href: '#change-pass',
            tab: <FormChangePass />,
        },
    ]
}

const InstagramProfilePreview = ({username}: InstagramProfilePreviewProps) => {
    return (
        <>
            { username && 
                <div className='flex justify-center'>
                    <iframe id="frame" width="380" height="550" src={`https://www.instagram.com/${username}/embed`}></iframe>
                </div>
            }
        </>
    )
}

const Profile: React.FC = () => {
    const { data: profile, isLoading } = useProfile()

    const tabs = useMemo(() => {
        if (!profile) return []
        return makeTabs(profile)
    }, [profile])

    if (isLoading) {
        return <div>Carregando...</div>
    }

    return (
        <DashboardLayouts title="Perfil" searchBlock={false}>
            <div className="container mx-auto mt-2">
                <div className="flex flex-wrap flex-1 mobile:flex-col">
                    <div className="flex flex-col flex-1 w-full gap-1 m-1 border border-gray-200 ">
                        <UserProfileCard />
                        <SocialLinks instagram={profile?.user_information?.contact?.instagram} />
                        { profile?.user_information?.contact?.instagram &&
                            <InstagramProfilePreview username={profile.user_information.contact.instagram}/>
                        }
                    </div>
                    <div className="w-full flex flex-[3] web:mt-0 mobile:!flex-1 overflow-hidden">
                        <HorizontalTabs
                            menu
                            categories={tabs}
                            classNames={{
                                panel: 'bg-white p-6 mt-2 mb-8',
                                tab: 'mobile:p-4',
                            }}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayouts>
    )
}

export default Profile
