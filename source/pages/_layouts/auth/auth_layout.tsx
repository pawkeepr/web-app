import React from 'react'
import HeaderTitle from '~/Components/atoms/header-title'

type AuthLayoutProps = {
    children: React.ReactNode
    title: string
}

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
    return (
        <div className="h-screen auth-bg-cover flex content-center items-center">
            <HeaderTitle title={title} />
            <div className="bg-overlay" />
            <div className="flex w-full h-full justify-center items-center gap-2 overflow-hidden">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout