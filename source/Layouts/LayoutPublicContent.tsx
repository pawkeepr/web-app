import React, { Suspense } from "react"
import LoadingPage from "~/pages/Modules/shared/LoadingPage"
import Header from "./Header"

type LayoutPublicContentProps = {
    children: React.ReactNode 
}

const LayoutPublicContent = ({children}: LayoutPublicContentProps) => {
    return (
        <>
            {/* TODO: make a custom public header */}
            <Header />
            <Suspense 
                fallback={<LoadingPage />}
            >
                {children}
            </Suspense>
        </>
    )
}


export default LayoutPublicContent