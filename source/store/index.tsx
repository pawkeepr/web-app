'use client'

import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { configureStore } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import rootReducer from './reducers'
import rootSaga from './sagas'

const queryClient = new QueryClient()

const configureDefaultStore = (initialState = {}) => {
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware]

    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(middlewares),
        preloadedState: initialState,
        devTools: process.env.NODE_ENV !== 'production',
    })

    sagaMiddleware.run(rootSaga)

    return store
}

const store = configureDefaultStore()
const persistor = persistStore(store)

type ProviderClientProps = {
    children: React.ReactNode
}

const ProviderClient = ({ children }: ProviderClientProps) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    {children}
                    {/* {process.env.NODE_ENV !== 'production' && (
                        <ReactQueryDevtools initialIsOpen />
                    )} */}
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    )
}

export default ProviderClient

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
