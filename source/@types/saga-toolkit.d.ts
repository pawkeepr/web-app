export function createSagaAction<T extends string>(type: T): SagaActionCreator<T>;
export function createSagaAction<T extends string, P extends any>(type: T): SagaActionCreator<T, P>;

export function* putAsync<T extends string>(action: any): SagaPutEffect<T>;

export function* takeEveryAsync<T extends string>(pattern: T, saga: Saga<T>, ...args: any): SagaTakeEveryEffect<T>;

export function* takeLatestAsync<T extends string>(pattern: T, saga: Saga<T>, ...args: any): SagaTakeLatestEffect<T>;

export function* takeAggregatedAsync<T extends string>(pattern: T, saga: Saga<T>, ...args: any): SagaTakeAggregatedEffect<T>;

declare module 'saga-toolkit' {
    export { createSagaAction, putAsync, takeEveryAsync, takeLatestAsync, takeAggregatedAsync };
}