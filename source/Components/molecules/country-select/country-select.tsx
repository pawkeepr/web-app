import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { country } from './types'

type CountrySelectProps = {
    onChangeCountry?: (country: country) => void
    onChangeValueCountry?: (country: string) => void
} & React.InputHTMLAttributes<HTMLDivElement>

type MemoCountries = {
    promise: Promise<country[]>
    data: country[] | undefined
    error: Error | undefined
}

const CountrySelect = ({
    onChangeCountry,
    onChangeValueCountry,
    className,
    ...rest
}: CountrySelectProps) => {
    const [selectedCountry, setSelectedCountry] = useState<string>('')

    const getCountries = async () => {
        const countries = await axios.get('https://restcountries.com/v3.1/all')

        return (countries as unknown as country[]).sort(
            (a: country, b: country) => {
                const nameA = a.translations?.por?.common.toUpperCase()
                const nameB = b.translations?.por?.common.toUpperCase()
                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            },
        )
    }

    const countries: MemoCountries = useMemo(() => {
        const promise = getCountries()
        return {
            promise,
            data: undefined,
            error: undefined,
        }
    }, [])

    const findCountry = useCallback(
        (value: string) =>
            countries.data?.find(
                (country: country) => country.name.common === value,
            ),
        [countries],
    )

    useEffect(() => {
        let isMounted = true
        countries.promise.then(
            (data) => {
                if (isMounted) {
                    countries.data = data
                }
            },
            (error) => {
                if (isMounted) {
                    countries.error = error
                }
            },
        )
        return () => {
            isMounted = false
        }
    }, [countries])

    useEffect(() => {
        if (!countries.data) return

        const findBrazil = findCountry('Brazil')

        if (!findBrazil) return

        setSelectedCountry(findBrazil.name.common)
    }, [countries.data, findCountry])

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value)
        onChangeValueCountry?.(event.target.value)
    }

    if (countries.error) {
        return (
            <div {...rest} className={`${className}`}>
                <select className="form-select" disabled>
                    <option value="">🇧🇷 Brasil</option>
                </select>
            </div>
        )
    }

    if (!countries.data) {
        return (
            <div {...rest} className={`${className}`}>
                <select className="form-select" disabled>
                    <option value="">Carregando...</option>
                </select>
            </div>
        )
    }

    return (
        <div className={`form-group ${className}`} {...rest}>
            <label htmlFor="country">País:</label>
            <select
                id="country"
                name="country"
                className="form-select"
                value={selectedCountry}
                onChange={handleCountryChange}
                disabled
            >
                <option value="">Selecione um país...</option>
                {countries.data?.map((country, index) => (
                    <option key={index} value={country.name.common}>
                        {country.flag}
                        <p className="ps-4">
                            {'   '}
                            {country.translations.por.common || country.name.common}
                        </p>
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CountrySelect
