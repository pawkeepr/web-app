export const encodeBase64 = (str: string) => {
    return btoa(encodeURIComponent(str))
}

export const decodeBase64 = (str: string) => {
    try {
        return decodeURIComponent(atob(str))
    } catch (e) {
        return str
    }
}
