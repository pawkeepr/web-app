import Head from 'next/head'

type HeaderTitleProps = {
    title: string
}

const HeaderTitle = ({ title }: HeaderTitleProps) => {
    return (
        <Head>
            <title>
                {process.env.NEXT_PUBLIC_APP_NAME || 'Pawkeepr'} - {title}
            </title>
        </Head>
    )
}

export default HeaderTitle
