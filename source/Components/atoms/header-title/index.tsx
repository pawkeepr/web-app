import Head from "next/head";

type HeaderTitleProps = {
    title: string;
};

const HeaderTitle = ({ title }: HeaderTitleProps) => {
    return (
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
            />
            ;
            <title>
                {process.env.NEXT_PUBLIC_APP_NAME || "Pawkeepr"} - {title}
            </title>
        </Head>
    );
};

export default HeaderTitle;
