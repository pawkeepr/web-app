import React from 'react';
import Card from 'react-bootstrap/Card';
import HeaderTitle from '~/Components/atoms/header-title';

type AuthLayoutProps = {
    children: React.ReactNode
    title: string
    bgColor?: string
    shadow?: string
}

const AuthLayout = ({ children, title, bgColor = '!bg-gray-50', shadow = 'shadow-xl' }: AuthLayoutProps) => {
    return (
        <div className="h-screen auth-bg-cover flex content-center items-center">
            <HeaderTitle title={title} />
            <div className="bg-overlay" />
            <div className="flex w-full h-full justify-center items-center gap-2 overflow-hidden">
                <Card className={`overflow-hidden ${shadow} mt-5 ${bgColor} sm:rounded-full w-full mx-4 sm:pr-24`}>
                    {children}
                </Card>
            </div>
        </div>
    )
}

export default AuthLayout