'use client'

import HeaderTitle from '~/Components/atoms/header-title';
import Section from './Section';

const ProjectOverview = () => {

    return (
        <div className="page-content">
            <HeaderTitle title="Dashboard" />
            <div className="container container-fluid">
                <Section />
            </div>
        </div>
    );
};

export default ProjectOverview;