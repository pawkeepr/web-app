export type country = {
    name: {
        common: string
        official: string
        nativeName: {
            hun: {
                official: string
                common: string
            }
        }
    }
    tld: string[]
    cca2: string
    ccn3: string
    cca3: string
    cioc: string
    independent: boolean
    status: string
    unMember: boolean
    currencies: {
        HUF: {
            name: string
            symbol: string
        }
    }
    idd: {
        root: string
        suffixes: string[]
    }
    capital: string[]
    altSpellings: string[]
    region: string
    subregion: string
    languages: {
        hun: string
    }
    translations: {
        [key: string]: {
            official: string
            common: string
        }
    }
    latlng: number[]
    landlocked: boolean
    borders: string[]
    area: number
    demonyms: {
        eng: {
            f: string
            m: string
        }
        fra: {
            f: string
            m: string
        }
    }
    flag: string
    maps: {
        googleMaps: string
        openStreetMaps: string
    }
    population: number
    gini: {
        [key: string]: number
    }
    fifa: string
    car: {
        signs: string[]
        side: string
    }
    timezones: string[]
    continents: string[]
    flags: {
        png: string
        svg: string
        alt: string
    }
    coatOfArms: {
        png: string
        svg: string
    }
    startOfWeek: string
    capitalInfo: {
        latlng: number[]
    }
    postalCode: {
        format: string
        regex: string
    }
}
