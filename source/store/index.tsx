'use client';

import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./reducers";

import rootSaga from "./sagas";

const configureDefaultStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
  })

  sagaMiddleware.run(rootSaga);

  return store;
}

const store = configureDefaultStore();

type ProviderClientProps = {
  children: React.ReactNode
}

const ProviderClient = ({ children }: ProviderClientProps) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default ProviderClient;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch