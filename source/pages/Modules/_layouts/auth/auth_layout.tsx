/* eslint-disable @next/next/no-img-element */
import type { StaticImageData } from 'next/image'
import type React from 'react'
import HeaderTitle from '~/Components/atoms/header-title'
import Footer from '~/Layouts/Footer'

import cn from 'classnames'
import Img from '~/Components/atoms/img'
import LoadingPage from '../../shared/LoadingPage'

type AuthLayoutProps = {
    children: React.ReactNode
    title: string
    hasImage?: boolean
    loading?: boolean
} & (
    | {
          image: StaticImageData | string
          alt: string
      }
    | {
          image?: never
          alt?: never
      }
)

const AuthLayout = ({
    children,
    title,
    image,
    alt,
    loading = false,
}: AuthLayoutProps) => {
    if (loading) {
        return (
            <main
                className={cn(
                    'flex flex-1 content-center mobile:content-start items-center justify-center mobile:items-start mobile:justify-start mobile:overflow-hidden',
                )}
            >
                <LoadingPage />
            </main>
        )
    }

    return (
        <div className="flex flex-col min-h-screen auth-bg-cover ">
            <HeaderTitle title={title} />
            <div className="bg-overlay" />
            <main
                className={cn(
                    'flex flex-1 content-center mobile:content-start items-center justify-center mobile:items-start mobile:justify-start mobile:overflow-hidden mt-2',
                )}
            >
                <section
                    className={cn(
                        'grid mobile:flex-1 mobile:min-h-screen mobile:flex-col mobile:!grid-cols-1 mobile:!h-full mobile:!w-full z-10 shadow-2xl rounded-lg mobile:rounded-none mobile:shadow-none mobile:overflow-hidden mobile:bg-white',
                        {
                            'w-[80%] grid-cols-1': !image,
                            'w-[80%] grid-cols-2': image,
                        },
                    )}
                >
                    {image && (
                        <picture className="flex mobile:h-64  overflow-hidden !w-full h-full relative rounded-l-xl mobile:rounded-l-none">
                            <Img
                                alt={alt}
                                src={image as string}
                                className="flex flex-1 w-full h-full bg-no-repeat !bg-cover mobile:!bg-contain"
                            />
                            <Img
                                src={image as string}
                                alt={alt}
                                className="absolute inset-0 hidden object-fill w-full h-full mobile:block"
                            />
                        </picture>
                    )}
                    <div
                        className={cn(
                            `
                                
                                !overflow-hidden relative mobile:rounded-r-none 
                                mobile:rounded-none grid grid-cols-1 mobile:!w-full 
                                mobile:!min-h-full py-4 px-12 
                                mobile:py-2 mobile:px-4 bg-white
                            `,
                            {
                                'rounded-r-xl': image,
                                'rounded-xl': !image,
                            },
                        )}
                    >
                        <div
                            className="flex h-40 mobile:h-36 w-full !bg-contain !bg-no-repeat !bg-center"
                            style={{
                                background: 'url(/logo-default.webp)',
                            }}
                        />
                        {children}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default AuthLayout
