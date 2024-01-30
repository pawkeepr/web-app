import HistoricPage from "~/pages/Modules/veterinary/HistoricPage";

import LayoutTutor from "~/Layouts/LayoutTutor";
import getServerSidePropsPagesPrivates from "~/helpers/get-server-side-props-pages-privates";

const HistoricPageNext = () => {
    return (
        <LayoutTutor>
            <HistoricPage />
        </LayoutTutor>
    );
};

export default HistoricPageNext;

export const getServerSideProps = getServerSidePropsPagesPrivates();
