'use client'

import { QueryClient, onlineManager } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import localforage from 'localforage'
import { useEffect } from 'react'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode: 'offlineFirst',
        },
    },
})

// Configuração do persister usando localForage
const localStoragePersister = createSyncStoragePersister({
    storage: localforage,
    retry: false,
})

type ReactQueryContextProps = {
    children: React.ReactNode
}

// Configuração do onlineManager para detectar status de rede
function setupOnlineManager() {
    if (typeof window !== 'undefined' && window.addEventListener) {
        const handleOnline = () => onlineManager.setOnline(true)
        const handleOffline = () => onlineManager.setOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }
}

const ReactQueryContext = ({ children }: ReactQueryContextProps) => {
    useEffect(() => {
        setupOnlineManager()
    }, [])

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: localStoragePersister }}
            onSuccess={() => {
                // Optional callback when hydration completes
                queryClient.resumePausedMutations()
            }}
        >
            {children}
            {process.env.NODE_ENV !== 'production' && (
                <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen />
            )}
        </PersistQueryClientProvider>
    )
}

export default ReactQueryContext
