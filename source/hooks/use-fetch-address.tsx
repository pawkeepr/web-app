/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { IAddress, fetchAddressByCep } from "~/helpers/fetch-address-by-cep"

type TUseFetchCep = {
    zipCode: string
    onChangeAddress: (address: IAddress) => void
}

const useFetchAddress = ({ zipCode, onChangeAddress }: TUseFetchCep) => {

    const [cepInvalid, setCepInvalid] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (zipCode.replace(/\D/g, '').length === 8) {
            setLoading(true)
            fetchAddressByCep(zipCode)
                .then((data) => {
                    // existem CEP's válidos que a API não devolve resultado
                    // setCepInvalid(Boolean(!data || data?.erro)) 
                    onChangeAddress(data as IAddress)
                })
                .catch(err => {
                    throw err
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoading(false)
                    }, 350)
                })
        }
    }, [zipCode])

    return { cepInvalid, loading }
}

export default useFetchAddress