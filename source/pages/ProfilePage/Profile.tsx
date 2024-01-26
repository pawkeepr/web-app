// path/filename: src/pages/Profile.tsx

import { useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    TabContent,
    TabPane,
} from 'reactstrap'
import DashboardLayouts from '../_layouts/dashboard/dashboard'
import FormChangePass from './components/Forms/ChangePass'
import FormPersonalData from './components/Forms/PersonalData'
import FormProfissionalExperiencie from './components/Forms/ProfessionalExperience'
import ProfileTabs from './components/ProfileTabs'
import SocialLinks from './components/SocialLinks'
import UserProfileCard from './components/UserProfileCard'

const Profile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('1')

    const tabChange = (tab: string) => {
        if (activeTab !== tab) setActiveTab(tab)
    }

    return (
        <DashboardLayouts title="Perfil" searchBlock={false}>
            <Row className="mt-14">
                <Col xxl={3}>
                    <UserProfileCard />
                    <SocialLinks />
                </Col>
                <Col xxl={9}>
                    <Card className="mt-xxl-n5">
                        <CardHeader>
                            <ProfileTabs
                                activeTab={activeTab}
                                onTabChange={tabChange}
                            />
                        </CardHeader>
                        <CardBody className="p-4">
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <FormPersonalData />
                                </TabPane>
                                <TabPane tabId="2">
                                    <FormChangePass />
                                </TabPane>
                                <TabPane tabId="3">
                                    <FormProfissionalExperiencie />
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </DashboardLayouts>
    )
}

export default Profile
