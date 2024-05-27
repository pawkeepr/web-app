import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import Modal from '~/Components/organism/modal' // Adapte este importe ao seu caminho real do componente Modal
import { BtnCancel, BtnPrimary } from '../../atoms/btn'

type RouteConfirmationModalProps = {
    title?: string
    description?: string
    message?: string
    label?: string
}

const RouteConfirmationModal = ({
    description = 'Você tem certeza de que deseja sair desta página? Suas mudanças não serão salvas.',
    title = 'Você tem certeza?',
    message = 'Esta ação não poderá ser desfeita.',
}: RouteConfirmationModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [nextRoute, setNextRoute] = useState('')
    const [confirmNavigation, setConfirmNavigation] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault()
            event.returnValue = '' // Necessário para alguns navegadores
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [])

    useEffect(() => {
        const handleRouteChangeStart = (url: string) => {
            if (confirmNavigation) {
                return
            }

            setIsOpen(true)
            setNextRoute(url)
            // Impede a navegação padrão
            router.events.emit('routeChangeError')
            // Omita o throw se não quiser logs de erro no console
            throw `Navigation to ${url} aborted by user decision.`
        }

        router.events.on('routeChangeStart', handleRouteChangeStart)

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart)
        }
    }, [confirmNavigation])

    const handleConfirmNavigation = useCallback(() => {
        setConfirmNavigation(true)
        // Prossegue com a navegação após confirmação
        async function navigate() {
            await router.push(nextRoute)
            setIsOpen(false)
            setNextRoute('')
        }
        navigate()
    }, [router, nextRoute]) // Inclui `router` e `nextRoute` como dependências

    const cancelNavigation = () => {
        setIsOpen(false)
        setNextRoute('')
    }

    return (
        <Modal open={isOpen} onClose={cancelNavigation} className="m-2 w-fit h-fit">
            <div className="flex justify-center items-center flex-col max-w-[480px] ">
                <h2 className="text-xl mb-1 font-semibold leading-6 text-gray-900 dark:!text-gray-200 text-center">
                    {title}
                </h2>

                <legend className="text-sm text-center text-gray-500 col-span-full">
                    {description}
                </legend>

                <p className="text-sm text-center text-gray-700 dark:!text-gray-300 leading-6">
                    {message}
                </p>

                <div className="flex items-center justify-center gap-1 mt-4">
                    <BtnCancel
                        type="button"
                        onClick={cancelNavigation}
                        label="Desistir"
                    />

                    <BtnPrimary
                        type="button"
                        label="Continuar"
                        onClick={handleConfirmNavigation}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default RouteConfirmationModal
