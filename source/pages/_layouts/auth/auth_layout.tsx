import Image, { StaticImageData } from "next/image";
import React from "react";
import HeaderTitle from "~/Components/atoms/header-title";
import Footer from "~/Layouts/Footer";

import cn from 'classnames';

type AuthLayoutProps = {
    children: React.ReactNode;
    title: string;
    hasImage?: boolean;
} & (
        | {
            image: StaticImageData | string;
            alt: string;
        }
        | {
            image?: never;
            alt?: never;
        }
    );

const AuthLayout = ({
    children,
    title,
    image,
    alt,
    hasImage = false
}: AuthLayoutProps) => {
    return (
        <div className="min-h-screen auth-bg-cover flex flex-col ">
            <HeaderTitle title={title} />
            <div className="bg-overlay" />
            <main className={cn("flex flex-1 content-center mobile:content-start items-center justify-center mobile:items-start mobile:justify-start mobile:overflow-hidden")}>
                <section className={cn(
                    "grid mobile:flex mobile:flex-1 mobile:min-h-screen mobile:flex-col mobile:!grid-cols-1 mobile:!h-full mobile:!w-full z-10 shadow-2xl rounded-lg mobile:rounded-none mobile:shadow-none mobile:overflow-hidden mobile:bg-white",
                    {
                        "w-[40%] grid-cols-1": !image,
                        "w-[90%] grid-cols-2": image,
                    }
                )}>
                    {image && (
                        <div className="mobile:h-24 h-full relative">
                            <picture className={cn("col-span-1 ", {
                                "block mobile:hidden": !hasImage,
                                "block": hasImage,
                            })}>
                                <Image
                                    className=" object-cover rounded-l-xl mobile:rounded-l-none"
                                    src={image}
                                    alt={alt}
                                    fill
                                />
                            </picture>
                        </div>
                    )}
                    <div className={cn(
                        "!overflow-hidden relative mobile:rounded-r-none mobile:rounded-none grid grid-cols-1 mobile:!w-full mobile:!min-h-full py-4 px-12 mobile:py-2 mobile:px-4 bg-white",
                        {
                            "rounded-r-xl": image,
                            "rounded-xl": !image,
                        }
                    )}>
                        <div className="flex flex-col justify-center items-center mt-5 mobile:mt-0 mb-2">
                            <Image
                                src='/logo-dark.png'
                                alt="logo"
                                className="hidden mobile:flex h-16 w-16"
                                width={64}
                                height={64}
                            />
                            <Image
                                src='/logo-mobile-login.png'
                                alt="logo"
                                className="mobile:hidden flex h-24 w-auto object-cover"
                                width={128}
                                height={128}
                            />
                        </div>
                        {children}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AuthLayout;
