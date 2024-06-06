import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loader from '~/Components/organism/loader'
import { useAppDispatch } from '~/store/hooks'
import { signOutUser } from '~/store/slices/auth/login/actions'

const LoadingPage = () => {
    const [expiredTime, setExpiredTime] = useState(false)
    const router = useRouter()

    const dispatch = useAppDispatch()

    useEffect(() => {
        const timeout = setTimeout(() => {
            setExpiredTime(true)
        }, 5000)
        return () => {
            clearTimeout(timeout)
            setExpiredTime(false)
        }
    }, [])

    const handleFailed = () => {
        dispatch(signOutUser())
        router.push('/sign-in')
        setExpiredTime(false)
    }

    return (
        <div className="z-50 flex items-center justify-center flex-1 min-w-full min-h-screen bg-primary-500">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="flex items-center justify-center mb-8">
                    <img
                        src="/logo-default-white-2.webp"
                        alt="Logo"
                        className="w-64 h-40"
                    />
                </div>
                <Loader
                    condition={!expiredTime}
                    type="Oval"
                    size={40}
                    borderColor="#fff"
                    color="#FFC86B"
                />
                {/* {
                    expiredTime && (
                        <div className="mt-4 text-center text-white">
                            <h1 className="text-2xl font-bold">Connection Timeout</h1>
                            <p className="text-sm">
                                Por favor, verifique sua conexão com a internet e tente novamente.
                            </p>
                        </div>
                    )
                } */}
                {expiredTime && (
                    <div className="mt-4 text-center text-white">
                        <h1 className="text-2xl font-bold">
                            Tempo de espera muito longo
                        </h1>
                        <p className="text-sm">
                            Pedimos desculpas pela demora, por favor, tente
                            novamente.
                        </p>
                        <button
                            type="button"
                            className="px-4 py-2 mt-4 text-gray-600 rounded-md bg-secondary-500"
                            onClick={handleFailed}
                        >
                            Voltar
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LoadingPage
