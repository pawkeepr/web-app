import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment } from 'react'
import MyImage from '~/Components/atoms/my-image/my-image'

import { ArrowLeftCircleIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import cn from 'classnames'
import type { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import useChangeLayoutMode from '~/hooks/use-change-layout-mode'
import useProfile from '~/store/hooks/profile/use-profile'

type CustomToggleProps = {
    onClick?: () => void
    avatar?: string | StaticImageData
    color?: string
}

export const ProfileButton = ({ onClick }: CustomToggleProps) => {
    const router = useRouter()
    const { data: profile } = useProfile()

    const handleProfile = () => {
        router.push('/profile')
    }

    return (
        <button
            type="button"
            className="flex flex-col items-center bg-transparent border-none justify-center mx-2 mobile:hidden"
            onClick={onClick || handleProfile}
        >
            <MyImage
                className="rounded-full w-10 h-10"
                src={profile?.user_information?.url_img as string}
                alt="Header Avatar"
            />
        </button>
    )
}

const options = [
    {
        label: 'Perfil',
        href: '/profile',
        icon: (active: boolean) => <UserCircleIcon className="w-5 h-5" />,
        dataKey: 'profile',
    },
    {
        href: '/logout',
        icon: (active: boolean) => (
            <ArrowLeftCircleIcon className="w-5 h-5 mt-1" viewBox="0 0 24 24" />
        ),
        label: 'Sair',
        dataKey: 'logout',
    },
]

const ProfileDropdownTailwind = () => {
    const { data: profile } = useProfile()

    const { onHandleChangeLayout } = useChangeLayoutMode()

    return (
        <Menu
            as="div"
            className="relative inline-block text-left mobile:hidden z-[99]"
        >
            <div>
                <Menu.Button
                    className="
                    inline-flex 
                    w-full 
                    justify-center 
                    rounded-md 
                    bg-opacity-20 
                    px-4 py-2 text-sm 
                    font-medium 
                    text-white 
                    hover:bg-opacity-30 
                    focus:outline-none 
                    focus-visible:ring-2 
                    focus-visible:ring-white 
                    focus-visible:ring-opacity-75
                "
                >
                    <ProfileButton onClick={() => {}} />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="
                    border
                    border-gray-300
                    dark:!border-gray-700
                    absolute 
                    right-0 
                    text-gray-500
                    m-2
                    py-2 
                    w-44
                    origin-top-right 
                    rounded-md 
                    bg-gray-100
                    dark:!bg-dark-500
                    shadow-lg 
                    ring-1 
                    ring-black 
                    ring-opacity-5 
                    flex flex-col
                    focus:outline-none"
                >
                    <div className="flex flex-1 self-center items-center justify-center">
                        <MyImage
                            className="rounded-full self-center"
                            src={profile?.user_information?.url_img || ''}
                            alt="Header Avatar"
                            height={60}
                            width={60}
                        />
                    </div>

                    <h6 className="text-xs text-center p-1 m-1">
                        Bem Vindo, {profile?.user_information?.first_name}!
                    </h6>

                    <Menu.Item as={Fragment}>
                        {({ active }) => (
                            <button
                                onClick={onHandleChangeLayout}
                                type="button"
                                className={cn(
                                    'hidden mobile:flex',
                                    'group w-full items-center justify-center rounded-md px-2 py-2 text-sm gap-2',
                                    {
                                        'bg-primary-500 dark:!bg-primary-600 text-white':
                                            active,
                                    },
                                    'light-dark-mode',
                                )}
                            >
                                <i className="bx bx-moon fs-16" />
                                <span className="align-middle">Modo</span>
                            </button>
                        )}
                    </Menu.Item>

                    <div className="px-1 py-1 ">
                        {options.map((item) => (
                            <Menu.Item key={item.href} as={Fragment}>
                                {({ active }) => (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2',
                                            {
                                                'bg-primary-500 dark:!bg-primary-600 text-white':
                                                    active,
                                            },
                                        )}
                                    >
                                        {item.icon(active)}
                                        <span className="align-middle">
                                            {item.label}
                                        </span>
                                    </Link>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default ProfileDropdownTailwind
