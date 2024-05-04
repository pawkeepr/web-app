/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { fetchAddressByCep, type IAddress } from '~/helpers/fetch-address-by-cep'

type TUseFetchCep = {
    zipCode: string
    onChangeAddress: (address: IAddress) => void
    initialValue?: string
}

const useFetchAddress = ({
    zipCode,
    onChangeAddress,
    initialValue,
}: TUseFetchCep) => {
    const [loading, setLoading] = useState(false)
    const [cpfNotFound, setCpfNotFound] = useState(false)
    useEffect(() => {
        if (initialValue === zipCode) return

        if (zipCode.replace(/\D/g, '').length === 8) {
            setLoading(true)
            fetchAddressByCep(zipCode)
                .then((data) => {
                    // existem CEP's válidos que a API não devolve resultado
                    setCpfNotFound(Boolean(!data || data?.erro))
                    onChangeAddress(data as IAddress)
                })
                .catch((err) => {
                    setCpfNotFound(true)
                    throw err
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoading(false)
                    }, 350)
                })
        }
    }, [zipCode])

    return { loading, cpfNotFound }
}

export default useFetchAddress
