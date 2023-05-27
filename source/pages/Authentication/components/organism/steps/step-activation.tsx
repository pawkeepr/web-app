import BtnSuccess from '~/Components/atoms/btn/btn-success';

import { BtnLabel } from '~/Components/atoms/btn';
import InputCode from '~/Components/atoms/input-code/input-code';
import { StepProps } from './types';

const StepActivation = ({ nextStep, prevStep, ...rest }: StepProps) => {
    const getInputElement = (index: number) => {
        return document.getElementById('digit' + index + '-input');
    }

    const moveToNext = (index: number) => () => {
        if (getInputElement(index)?.value.length === 1) {
            if (index !== 6) {
                getInputElement(index + 1)?.focus();
            } else {
                getInputElement(index)?.blur();
                // Submit code
                console.log('submit code');
            }
        }
    }

    // useNextStep(nextStep, true, 1000)

    return (

        <div className="p-2 mt-4">
            <form>
                <div className="grid grid-cols-6 w-full gap-2">
                    {
                        [1, 2, 3, 4, 5, 6].map((item, index) => (
                            <div className="col-span-1" key={item} >
                                <InputCode moveToNext={moveToNext(index)} id={'digit' + index + '-input'} />
                            </div>
                        ))
                    }
                </div>
            </form>
            <div className="mt-3">
                <BtnSuccess label='Confirmar' className="w-full" onClick={nextStep} />
            </div>
            <div className="mt-4 text-center">
                <p className="mb-0">Você não recebeu o código?</p>
                <BtnLabel label='Reenviar' />
            </div>
        </div>

    )
}

export default StepActivation