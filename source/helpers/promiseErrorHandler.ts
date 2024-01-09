type HandleReject = [Error, null];
type HandleResolve<T> = [null, T];
type PromiseHandleErr = <T>(
    cb: Promise<T>,
) => Promise<HandleReject | HandleResolve<T>>;

const promiseHandleErr: PromiseHandleErr = async (cb) => {
    try {
        const res = await cb;
        return [null, res];
    } catch (err) {
        return [err as Error, null];
    }
};

export default promiseHandleErr;
