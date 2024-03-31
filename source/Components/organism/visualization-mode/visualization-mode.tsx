import { FaList } from 'react-icons/fa'
import { PiSlideshowFill } from 'react-icons/pi'
import { tv } from 'tailwind-variants'
import { BtnIcon } from '~/Components/atoms/btn'

const btn = tv({
    base: `
    w-fit m-0 p-1 h-fit 
    border-2 border-gray-300 
    rounded-md items-center justify-center flex text-lg
    `,
})

const VisualizationMode = () => {
    return (
        <div className="flex flex-1 gap-1">
            {/* botão de mudança de estilo de visualização de grip e listagem */}
            <BtnIcon
                icon={<PiSlideshowFill />}
                type="button"
                title="Modo de visualização de grid"
                className={btn()}
            />
            <BtnIcon
                icon={<FaList />}
                type="button"
                title="Modo de visualização de lista"
                className={btn()}
            />
        </div>
    )
}

export default VisualizationMode
