import { useSearchParams } from "next/navigation";
import getServerSidePropsPagesPrivates from "~/helpers/get-server-side-props-pages-privates";
import Page from "~/pages/UpdatePetPage";

const PetsPage = () => {
    const search = useSearchParams();
    const document = search.get("document") || "";

    return <Page document={document} />;
};

export default PetsPage;

export const getServerSideProps = getServerSidePropsPagesPrivates();
