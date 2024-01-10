export default function authHeader() {
    const obj = JSON.parse(sessionStorage.getItem('authUser'))

    if (obj?.accessToken) {
        return { Authorization: obj.accessToken }
    }
    return {}
}
