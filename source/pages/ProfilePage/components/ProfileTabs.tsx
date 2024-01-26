// path/filename: src/components/ProfileTabs.js

import classnames from 'classnames'
import { Nav, NavItem, NavLink } from 'reactstrap'

interface ProfileTabsProps {
    activeTab: string
    onTabChange: (tab: string) => void
}

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
    return (
        <Nav
            className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
            role="tablist"
        >
            <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => onTabChange('1')}
                >
                    <i className="fas fa-home" />
                    Informações Pessoais
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => onTabChange('2')}
                >
                    <i className="fas fa-user" />
                    Histórico
                </NavLink>
            </NavItem>
        </Nav>
    )
}

export default ProfileTabs
