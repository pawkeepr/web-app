import { HiUserGroup } from "react-icons/hi2";
import { MdOutlinePets } from "react-icons/md";
import HorizontalTabs, {
    type TabItem,
} from "~/Components/organism/horizontal-list";
import DefaultLayout from "../../_layouts/dashboard/dashboard";
import PetsTab from "./components/organisms/PetsTab";
import TutorsTab from "./components/organisms/TutorsTab";

const Tabs = (): TabItem[] => [
    {
        id: 1,
        title: "Pets",
        href: "#pets",
        icon: <MdOutlinePets className="w-6 h-6" />,
        tab: <PetsTab />,
    },
    {
        id: 2,
        title: "Tutores",
        href: "#tutors",
        icon: <HiUserGroup className="w-6 h-6" />,
        tab: <TutorsTab />,
    },
];

const PetAndTutors = <T,>() => {
    const tabs = Tabs();
    return (
        <DefaultLayout title="Dashboard" searchBlock={false}>
            <HorizontalTabs categories={tabs} />
        </DefaultLayout>
    );
};

export default PetAndTutors;
