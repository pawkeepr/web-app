import { useSearchParams } from "next/navigation";
import getServerSidePropsPagesPrivates from "~/helpers/get-server-side-props-pages-privates";
import Page from "~/pages/NewPetPage";

const PetsPage = () => {
    const search = useSearchParams();
    const document = search.get("document") || "";
    const id_pet = search.get("id_pet") || undefined;

    return <Page document={document} id_pet={id_pet} />;
};

export default PetsPage;

export const getServerSideProps = getServerSidePropsPagesPrivates();
