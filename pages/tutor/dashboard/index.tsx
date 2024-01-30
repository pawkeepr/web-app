import DashboardPage from "~/pages/Modules/veterinary/DashboardPage";

import LayoutTutor from "~/Layouts/LayoutTutor";
import getServerSidePropsPagesPrivates from "~/helpers/get-server-side-props-pages-privates";

const DashboardPageNext = () => {
    return (
        <LayoutTutor>
            <DashboardPage />
        </LayoutTutor>
    );
};

export default DashboardPageNext;

export const getServerSideProps = getServerSidePropsPagesPrivates();
