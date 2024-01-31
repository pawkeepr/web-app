import DefaultLayout from "../../_layouts/dashboard/dashboard";

import { MdCancel, MdCheckCircle } from "react-icons/md";
import HorizontalTabs from "~/Components/organism/horizontal-list/horizontal-list";
import StepScheduledCanceled from "./components/organisms/steps/step-scheduled-canceled";
import StepScheduledDone from "./components/organisms/steps/step-scheduled-done";

const Tabs = () => [
    {
        id: 3,
        title: "Consultas Canceladas",
        href: "#canceled",
        icon: (
            <MdCancel className="w-6 h-6" />
            // <div style={{ position: 'relative', display: 'inline-block' }}>
            //     <MdDescription size="1.5rem" /> {/* Ícone de Documento */}
            //     <MdOutlineCancel
            //         size="0.8rem"
            //         style={{
            //             position: 'absolute',
            //             top: '0',
            //             right: '0',
            //             color: '#732C2C',
            //         }}
            //     />{' '}
            //     {/* Ícone de Cancelamento */}
            // </div>
        ),
        tab: <StepScheduledCanceled />,
    },
    {
        id: 5,
        title: "Consultas Finalizadas",
        href: "#done",
        icon: <MdCheckCircle className="w-6 h-6" />,
        tab: <StepScheduledDone />,
    },
];

const HistoricPage = <T,>() => {
    const categories = Tabs();

    return (
        <DefaultLayout title="Dashboard" searchBlock name="historic">
            <HorizontalTabs categories={categories} />
        </DefaultLayout>
    );
};

export default HistoricPage;
