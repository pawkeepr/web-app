import type { MutableRefObject } from 'react'
import AvatarEditor from 'react-avatar-editor'
import withControl from '~/Components/helpers/with-control'

type ProfileEditorProps = {
    editorRef: MutableRefObject<AvatarEditor>
    file: File
}

const ProfileEditor = ({ editorRef, file }: ProfileEditorProps) => {
    return (
        <AvatarEditor
            ref={editorRef}
            image={file}
            className="border-2"
            width={320}
            height={320}
            borderRadius={250}
            scale={1.2}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            rotate={0}
        />
    )
}

export default withControl(ProfileEditor)
