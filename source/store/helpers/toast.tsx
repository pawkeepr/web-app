import { Theme, ToastOptions, ToastPosition, toast } from 'react-toastify';

export const OptionsDefault = {
    position: 'bottom-center' as ToastPosition,
    autoClose: 2000,
    closeButton: true,
    closeOnClick: true,
    theme: 'colored' as Theme,
    icon: true,
    pauseOnVisibilityChange: true,
    draggable: true,
    pauseOnHover: true,
    style: {
        width: '50%',
        textAlign: 'center',
        padding: '2rem',
        minWidth: '450px',
    }, // Estilo para ocupar a tela toda e centralizar
} as ToastOptions;

type Options = Partial<typeof OptionsDefault>;

type ToastMessage = {
    id?: string;
    type?: 'success' | 'error' | 'info';
    description?: string;
};

export const buildToast = async (
    { type, description = '' }: ToastMessage,
    options?: Options,
) => {
    const optionsDefault = { ...OptionsDefault, ...options };

    const msg = <>{description && <p>{description}</p>}</>;

    const textStyle = '!font-semibold !text-base';

    if (type === 'success') {
        return toast.success(msg, {
            ...optionsDefault,
            className: '!bg-primary-500 text-white ' + textStyle,
        });
    }

    if (type === 'error') {
        return toast.error(msg, {
            ...optionsDefault,
            className: '!bg-secondary-500 !text-gray-500 ' + textStyle,
        });
    }

    return toast.info(msg, {
        ...optionsDefault,
        className: '!bg-secondary-500 !text-gray-500 ' + textStyle,
    });
};

export const successToast = async (
    description: string,
    title = 'Operação Concluida!',
    options?: Options,
) => {
    return buildToast({ description, type: 'success' }, options);
};

export const errorToast = async (
    description: string,
    title = 'Erro na Operação!',
    options?: Options,
) => {
    return buildToast({ description, type: 'error' }, options);
};

export const infoToast = async (
    description: string,
    title = 'Aviso!',
    options?: Options,
) => {
    return buildToast({ description, type: 'info' }, options);
};
