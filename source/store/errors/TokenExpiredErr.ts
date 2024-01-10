// Path: source/store/errors/TokenExpiredErr.ts
class TokenExpiredErr extends Error {
    constructor() {
        super('Token expirado')
    }
}
