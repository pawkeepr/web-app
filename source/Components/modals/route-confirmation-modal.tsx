import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Modal from '~/Components/organism/modal'; // Adapte este importe ao seu caminho real do componente Modal

const RouteConfirmationModal = ({
    message = "Você tem certeza de que deseja sair desta página? Suas mudanças não serão salvas."
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [nextRoute, setNextRoute] = useState('')
    const router = useRouter()

    useEffect(() => {
        const handleRouteChangeStart = (url) => {
            setIsOpen(true)
            setNextRoute(url)
            // Impede a navegação padrão
            router.events.emit('routeChangeError')
            // Omita o throw se não quiser logs de erro no console
            // throw `Navigation to ${url} aborted by user decision.`;
        }

        router.events.on('routeChangeStart', handleRouteChangeStart)

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart)
        }
    }, [router])

    const confirmNavigation = () => {
        setIsOpen(false)
        // Prossegue com a navegação após confirmação
        router.push(nextRoute).then(() => setNextRoute(''))
    }

    const cancelNavigation = () => {
        setIsOpen(false)
        setNextRoute('')
    }

    return (
        <Modal open={isOpen} onClose={cancelNavigation}>
            <div>
                <p>{message}</p>
                <button type="button" onClick={confirmNavigation}>Confirmar</button>
                <button type="button" onClick={cancelNavigation}>Cancelar</button>
            </div>
        </Modal>
    )
}

export default RouteConfirmationModal
