import React from "react";
import HeaderTitle from "~/Components/atoms/header-title";

type AuthLayoutProps = {
    children: React.ReactNode;
    title: string;
};

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
    return (
        <div className="h-screen auth-bg-cover flex flex-col content-center items-center">
            <HeaderTitle title={title} />
            <div className="bg-overlay" />
            <div className="flex items-center justify-center h-full w-full overflow-auto">
                {children}
            </div>
            <footer className="hidden bg-gray-800 md:block w-full p-3 text-slate-300 text-center">
                &copy; {new Date().getFullYear()} PawKeeprs Smartcare.
            </footer>
        </div>
    );
};

export default AuthLayout;
