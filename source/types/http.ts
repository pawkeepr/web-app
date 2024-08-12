export const METHODS_HTTP = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE',
} as const

export type MethodsHttp = (typeof METHODS_HTTP)[keyof typeof METHODS_HTTP]
