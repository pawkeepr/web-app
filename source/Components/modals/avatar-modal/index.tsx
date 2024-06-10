import { useRef, useState } from 'react'
import Avatar from '~/Components/atoms/avatar'
import { BtnCancel, BtnSuccess } from '~/Components/atoms/btn'
import AvatarPet from '~/Components/molecules/avatar-pet'
import type { AvatarPetProps } from '~/Components/molecules/avatar-pet/avatar-pet'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import ProfileEditor from './profile-editor'

const AvatarModal = ({
    oldImageSrc = '',
    modalButtonSize = 'large',
    disabled = false,
    isLoading,
    onSave,
    ...props
}: {
    oldImageSrc?: string
    isLoading?: boolean
    disabled?: boolean
    modalButtonSize?: 'small' | 'medium' | 'large'
    onSave?: (file: File) => Promise<void>
} & AvatarPetProps) => {
    const editorRef = useRef(null)
    const [file, setFile] = useState<File | undefined>()
    const { closeModal, open, showModal } = useModal()

    const handleSave = async () => {
        if (!editorRef.current) return
        const dataUrl = editorRef.current.getImage().toDataURL()
        const result = await fetch(dataUrl)
        const blob = await result.blob()
        const file = new File([blob], 'file')
        await onSave?.(file)
        closeModal()
    }

    const setFileData = (e: React.ChangeEvent<HTMLInputElement> | null) => {
        if (e?.target?.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    return (
        <>
            <button
                type="button"
                title={
                    disabled
                        ? 'Finalize a criação para personalizar o avatar'
                        : 'Editar foto'
                }
                disabled={disabled}
                className="disabled:cursor-default"
                onClick={showModal}
            >
                <AvatarPet src={oldImageSrc} name_pet="profile" {...props} />
            </button>
            <Modal onClose={closeModal} open={open}>
                <div>
                    <h1 className="mb-5 text-lg font-semibold text-center">
                        Editar foto de perfil
                    </h1>
                    <input
                        type="file"
                        onChange={(e) => setFileData(e)}
                        multiple={false}
                    />
                    <div className="flex justify-center my-2">
                        <ProfileEditor
                            condition={!!file}
                            editorRef={editorRef}
                            file={file}
                        />
                        <Avatar
                            condition={!file}
                            src={oldImageSrc}
                            alt="Previous profile pic"
                            size="veryLarge"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <BtnCancel
                            label="Cancelar"
                            onClick={closeModal}
                            condition={!isLoading}
                        />
                        <BtnSuccess
                            label="Salvar"
                            onClick={handleSave}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AvatarModal
