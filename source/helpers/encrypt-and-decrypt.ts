import Crypto from 'crypto-js'

export const encrypt = (text: string): string => {
    const cipher = Crypto.AES.encrypt(text, process.env.SECRET_KEY || 'secret-key')
    return cipher.toString()
}

export const decrypt = (text: string) => {
    const bytes = Crypto.AES.decrypt(text, process.env.SECRET_KEY || 'secret-key')
    const data = bytes.toString(Crypto.enc.Utf8)
    return data
}
