/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useEffect, useState } from 'react';

import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationCN from './locales/ch.json';
import translationENG from './locales/en.json';
import translationFR from './locales/fr.json';
import translationGr from './locales/gr.json';
import translationIT from './locales/it.json';
import translationPT_BR from './locales/pt-BR.json';
import translationRS from './locales/ru.json';
import translationSP from './locales/sp.json';

// the translations
const resources = {
    gr: {
        translation: translationGr,
    },
    it: {
        translation: translationIT,
    },
    rs: {
        translation: translationRS,
    },
    sp: {
        translation: translationSP,
    },
    en: {
        translation: translationENG,
    },
    cn: {
        translation: translationCN,
    },
    fr: {
        translation: translationFR,
    },
    'pt-BR': {
        translation: translationPT_BR,
    },
} as const;

type Language = keyof typeof resources;

const useLanguage = () => {
    const [language, setLanguage] = useState<Language>('pt-BR');

    useEffect(() => {
        if (!language) {
            localStorage.setItem('I18N_LANGUAGE', 'en');
        }

        setLanguage(
            (localStorage.getItem('I18N_LANGUAGE') as Language) || 'en',
        );
    }, [language]);

    return i18n
        .use(detector)
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources,
            lng: language,
            fallbackLng: 'en', // use en if detected lng is not available

            keySeparator: false, // we do not use keys in form messages.welcome

            interpolation: {
                escapeValue: false, // react already safes from xss
            },
        });
};

export default useLanguage;
