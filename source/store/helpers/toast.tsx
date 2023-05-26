import { Theme, ToastPosition, toast } from "react-toastify";

export const OptionsDefault = {
  position: "top-right" as ToastPosition,
  autoClose: 2000,
  closeButton: true,
  closeOnClick: true,
  theme: 'colored' as Theme,
  icon: true,
}

type Options = Partial<typeof OptionsDefault>;

type ToastMessage = {
  id?: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export const buildToast = async ({ type, title, description = '' }: ToastMessage, options?: Options) => {
  const optionsDefault = { ...OptionsDefault, ...options };

  const msg = (
    <>
      <strong>{title}</strong>
      <br />
      {description && <p>{description}</p>}
    </>
  )



  if (type === 'success') {
    return toast.success(msg, optionsDefault);
  }

  if (type === 'error') {
    return toast.error(msg, optionsDefault);
  }

  return toast.info(msg, optionsDefault);

}

export const successToast = async (description: string, title = 'Operação Concluida!', options?: Options) => {
  return buildToast({ title, description, type: 'success' }, options);
}

export const errorToast = async (description: string, title = 'Erro na Operação!', options?: Options) => {
  return buildToast({ title, description, type: 'error' }, options);
}

export const infoToast = async (description: string, title = 'Aviso!', options?: Options) => {
  return buildToast({ title, description, type: 'info' }, options);
}

