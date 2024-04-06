import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loader from '~/Components/organism/loader'

const LoadingPage = () => {
    const [expiredTime, setExpiredTime] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const timeout = setTimeout(() => {
            setExpiredTime(true)
        }, 10000)
        return () => {
            clearTimeout(timeout)
            setExpiredTime(false)
        }
    }, [])


    return (
        <div className="bg-primary-500 min-h-screen min-w-full flex flex-1 items-center justify-center z-50">
            <div className="flex flex-col justify-center items-center h-full">
                <div className="flex justify-center items-center mb-8">
                    <img src="/logo-default-white-2.webp" alt="Logo" className="w-64 h-40" />
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
                        <div className="text-white text-center mt-4">
                            <h1 className="text-2xl font-bold">Connection Timeout</h1>
                            <p className="text-sm">
                                Por favor, verifique sua conexão com a internet e tente novamente.
                            </p>
                        </div>
                    )
                } */}
                {
                    expiredTime && (
                        <div className="text-white text-center mt-4">
                            <h1 className="text-2xl font-bold">Tempo de espera muito longo</h1>
                            <p className="text-sm">
                                Pedimos desculpas pela demora, por favor, tente novamente.
                            </p>
                            <button
                                type='button'
                                className="text-gray-600 bg-secondary-500 px-4 py-2 mt-4 rounded-md"
                                onClick={() => router.back()}
                            >
                                Voltar
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default LoadingPage
