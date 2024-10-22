import { Fade } from 'react-awesome-reveal'
import withControl from '~/Components/helpers/with-control'
import Loader from '~/Components/organism/loader'

const WarningNoHaveSelectPet = ({ isPending = false }) => {
    return (
        <div
            aria-live="polite"
            className="absolute z-50 flex flex-col items-center justify-start w-full h-full gap-2 pt-10 bg-gray-100 bg-opacity-70 "
        >
            <Fade>
                <h6 className="text-base font-bold text-center text-gray-700 ">
                    Nenhum Pet Selecionado
                    <legend className="text-sm font-semibold text-center text-gray-600">
                        Para habilitar os módulos, por favor, selecione um pet
                    </legend>
                    {isPending && <Loader width={32} height={32} type="Circles" />}
                </h6>
            </Fade>
        </div>
    )
}

export default withControl(WarningNoHaveSelectPet)
