import { useTranslation as useTranslationReactI18Next } from 'react-i18next'
import type ptBr from '../../public/locales/pt-br/common.json'

const KEYS_TRANSLATIONS = {
    common: 'common',
    footer: 'footer',
} as const
type KEYS_TRANSLATIONS = (typeof KEYS_TRANSLATIONS)[keyof typeof KEYS_TRANSLATIONS]

type KEYS_TRANSLATIONS_VALUES = keyof typeof ptBr

type UseTranslationsReturn = {
    t: (key: KEYS_TRANSLATIONS_VALUES | string) => string
}

export const useTranslations = (ns?: KEYS_TRANSLATIONS): UseTranslationsReturn => {
    const { t } = useTranslationReactI18Next<KEYS_TRANSLATIONS>(ns)

    return {
        t,
    }
}
