import { useTranslation } from 'next-i18next';
import pt_BR from 'public/locales/pt-BR/common.json';

type KeysTranslation = keyof typeof pt_BR;

const useTranslationSafe = () => {
    const { t } = useTranslation();
    return t as (key: KeysTranslation) => string;
};

export default useTranslationSafe;
