import React from "react";
import HeaderTitle from "~/Components/atoms/header-title";
import Footer from "~/Layouts/Footer";

type AuthLayoutProps = {
    children: React.ReactNode;
    title: string;
};

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
    return (
        <div className="h-screen auth-bg-cover flex flex-col ">

            <HeaderTitle title={title} />
            <div className="bg-overlay" />
            <main className="flex flex-1 content-center items-center justify-center mobile:overflow-hidden">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default AuthLayout;
