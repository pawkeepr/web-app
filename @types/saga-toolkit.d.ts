declare module 'saga-toolkit' {
    type Request = {
        requestId: string;
        deferred: Deferred<any>;
        onAdd?: (request: Request) => void;
        abort?: () => void;
    };

    type Requests = { [requestId: string]: Request };

    type SagaActionCreator<TPayload = any, TMeta = any> = {
        type: string;
        typePrefix: string;
        pending: string;
        fulfilled: string;
        rejected: string;
        (payload?: TPayload, meta?: TMeta): (dispatch: any, getState: any) => Promise<any>;
    };

    function createSagaAction<TPayload = any, TMeta = any>(type: string): SagaActionCreator<
        TPayload,
        TMeta & { requestId: string }
    >;

    function putAsync<A extends Action<any>>(action: A): ReturnType<Effect>;
    function takeLatestAsync<A extends Action<any>, Fn extends (action: A) => any>(
        pattern: string | ((action: A) => boolean),
        saga: Fn,
        ...args: Parameters<Fn>
    ): ForkEffect<Task>;
    function takeEveryAsync<A extends Action<any>, Fn extends (action: A) => any>(
        pattern: string | ((action: A) => boolean),
        saga: Fn,
        ...args: Parameters<Fn>
    ): ForkEffect<Task>;
    function takeAggregateAsync<A extends Action<any>, Fn extends (action: A) => any>(
        pattern: string | ((action: A) => boolean),
        saga: Fn,
        ...args: Parameters<Fn>
    ): ForkEffect<Task>;

    export {
        Request,
        Requests,
        createSagaAction,
        putAsync,
        takeAggregateAsync,
        takeEveryAsync,
        takeLatestAsync
    };
}
