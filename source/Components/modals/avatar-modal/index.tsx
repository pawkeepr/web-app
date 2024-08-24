import { CameraIcon } from '@heroicons/react/24/solid'
import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { BtnCancel, BtnSuccess } from '~/Components/atoms/btn'
import AvatarPet from '~/Components/molecules/avatar-pet'
import type { AvatarPetProps } from '~/Components/molecules/avatar-pet/avatar-pet'
import Modal from '~/Components/organism/modal'
import Env from '~/env'
import useModal from '~/hooks/use-modal'
import FileUpload from '~/ui/file-upload'
import ProfileEditor from './profile-editor'

const AvatarModal = ({
    oldImageSrc = '',
    progress = 0,
    modalButtonSize = 'large',
    disabled = false,
    isLoading,
    onSave,
    ...props
}: {
    oldImageSrc?: string
    isLoading?: boolean
    disabled?: boolean
    progress?: number
    modalButtonSize?: 'small' | 'medium' | 'large'
    onSave?: (file: FormData) => Promise<void>
} & AvatarPetProps) => {
    const editorRef = useRef(null)
    const [file, setFile] = useState<File | null>(null)
    const { closeModal, open, showModal } = useModal()
    const FLAG_DEV = Env().get('FLAG_DEV')

    useEffect(() => {
        if (!open) {
            setFile(null)
        }
    }, [open])

    const handleSave = async () => {
        if (!editorRef.current) return
        const dataUrl = editorRef.current?.getImage()?.toDataURL()

        const result = await fetch(dataUrl)

        const blob = await result.blob()
        const file = new File([blob], 'file')
        const formData = new FormData()
        formData.append('file', file)
        formData.append('mimeType', blob.type)

        await onSave?.(formData)
        closeModal()
    }

    return (
        <>
            <button
                type="button"
                title="Editar foto"
                className={cn(
                    {
                        'opacity-50': disabled,
                    },
                    'relative border border-opacity-10  rounded-full border-black hover:border-secondary hover:shadow-lg transition duration-100 ease-in-out',
                )}
                onClick={showModal}
            >
                <AvatarPet src={oldImageSrc} {...props} />
                <CameraIcon className="absolute bottom-0 right-0 w-8 h-8 text-white transform -translate-x-1/2 -translate-y-1/2" />
            </button>
            <Modal onClose={closeModal} open={open} mobilePage={false}>
                <div>
                    <FileUpload
                        onChange={(files) => setFile(files[0])}
                        accept="image/jpg, image/jpeg, image/png"
                        acceptDragDrop={{
                            'image/*': ['.jpg', '.jpeg', '.png'],
                        }}
                        disabled={disabled}
                        multiple={false}
                    >
                        <AvatarPet
                            specie="human"
                            condition={!file}
                            src={oldImageSrc}
                            alt="Previous profile pic"
                        />
                    </FileUpload>
                    <div className="flex justify-center my-2">
                        <ProfileEditor
                            condition={!!file}
                            editorRef={editorRef}
                            file={file}
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
                    <div
                        className="relative flex flex-col w-full mt-1 overflow-hidden transition-all duration-300 "
                        style={{ opacity: progress / 100 }}
                    >
                        <progress
                            id="progressBar"
                            className="transition-all progress progress-primary w-(100% - 32px) "
                            value={progress}
                            max="100"
                        />
                        <label
                            className="w-full px-2 text-gray-500 "
                            htmlFor="progressBar"
                            style={{
                                transform: `translateX(calc(${progress}% - ${
                                    progress < 50 ? -0 : 10
                                }%))`,
                            }}
                        >
                            <span className="label-text">{progress}%</span>
                        </label>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AvatarModal
