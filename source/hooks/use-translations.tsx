import { useTranslation as useTranslationReactI18Next } from 'react-i18next'
import ptBr from '../../public/locales/pt-br/common.json'

const KEYS_TRANSLATIONS = {
    common: 'common',
} as const
type KEYS_TRANSLATIONS = (typeof KEYS_TRANSLATIONS)[keyof typeof KEYS_TRANSLATIONS]

type KEYS_TRANSLATIONS_VALUES = keyof typeof ptBr

type UseTranslationsReturn = {
    t: (key: KEYS_TRANSLATIONS_VALUES | string) => string
}

export const useTranslations = (
    ns: KEYS_TRANSLATIONS = 'common',
): UseTranslationsReturn => {
    const { t } = useTranslationReactI18Next<KEYS_TRANSLATIONS>(ns)

    return {
        t: (key) => ptBr[key] || t(key),
    }
}
