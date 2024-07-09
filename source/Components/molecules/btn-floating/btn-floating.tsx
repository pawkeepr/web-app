import React, { useEffect, useState, type ComponentProps } from 'react'
import type { IconType } from 'react-icons'
import { tv, type VariantProps } from 'tailwind-variants'
import withControl from '~/Components/helpers/with-control'
import Hammer from 'react-hammerjs'
import { i } from 'vitest/dist/reporters-yx5ZTtEV'
import { isClickableInput } from '@testing-library/user-event/dist/types/utils'

type PanEvent = {
    deltaX: number;
    deltaY: number;
    type: string;
    // Adicione outras propriedades conforme necessário
};


const buttonFloating = {
    button: tv({
        base: `
        fixed z-50 flex flex-col items-center justify-center
        transition duration-500 ease-in-out mobile:opacity-100 bottom-5 right-1
        opacity-40
        hover:opacity-100
    `,
        variants: {
            'position-x': {
                right: 'right-1',
                left: 'left-1',
            },
             'position-y': {
                 top: 'top-5',
                 bottom: 'bottom',
             },
        },
        defaultVariants: {
            'position-x': 'right',
            'position-y': 'bottom',
        },
    }),
    title: tv({
        base: `
     mb-1 text-xs font-bold text-gray-600 wrap w-20 text-center
    `,
    }),
    containerIcon: tv({
        base: `
        p-3 rounded-full bg-secondary-500 !shadow-2xl
    `,
    }),
    icon: tv({
        base: `
        w-8 h-8 text-gray-500
    `,
    }),
}



type BtnFloatingProps = {
    onClick: () => void
    icon: IconType
    title: string
} & VariantProps<typeof buttonFloating.button> &
    ComponentProps<'button'>

export const BtnFloating = ({
    onClick,
    icon: Icon,
    title,
    ...props
}: BtnFloatingProps) => {
    
    
    return (
        <button
            title={title}
            type="button"
            onClick={onClick}
            id='myButton'
            className={buttonFloating.button({ ...props })}
            {...props}
        >
            <h6 className={buttonFloating.title()}>{title}</h6>
            <div className={buttonFloating.containerIcon()}>
                <Icon className={buttonFloating.icon()} />
            </div>
        </button>
    )
}

type BtnLinkFloatingProps = {
    icon: IconType
    title: string
} & VariantProps<typeof buttonFloating.button> &
    ComponentProps<'a'>

    export const BtnLinkFloating = ({
        href,
        icon: Icon,
        title,
        onClick,
        ...props
    }: BtnLinkFloatingProps) => {
            const [position, setPosition] = useState({ x: 0, y: 0 });
            const [isCLick, setisCLick] = useState(true);


            useEffect(() => {
                const Hammer = require('hammerjs');
                const buttonFloat = document.getElementById('myButton');
                if (!buttonFloat) return;
        
                const hammer = new Hammer(buttonFloat);
        
                hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        
                hammer.on('pan', (event) => {
                    const newX = position.x + event.deltaX;
                    const newY = position.y + event.deltaY;

                    if (buttonFloat) {
                        buttonFloat.style.transform = `translate(${newX}px, ${newY}px)`;
                        buttonFloat.style.transition = '0.2s';
                        
                    }
                    if(event.srcEvent.type === 'pointerup') {
                        setTimeout(() => {
                            setisCLick(false);
                        }, 2000);
                    }
                });
                
                hammer.on('panend', (event) => {
                    setPosition({
                        x: position.x + event.deltaX,
                        y: position.y + event.deltaY,
                    });
                   
                    
                });
                
                
                return () => {
                    hammer.stop(false);
                    hammer.destroy();
                };
            }, [position]);
        
        return (
            <a
                id='myButton'
                onClick={isCLick ? () => {} : onClick}
                {...props}
                title={title}
                type="button"
                href={isCLick ? '#': href}
                className={buttonFloating.button({ ...props })}
            >
                <h6 className={buttonFloating.title()}>{title}</h6>
                <div className={buttonFloating.containerIcon()}>
                    <Icon className={buttonFloating.icon()} />
                </div>
            </a>
            // </Hammer>
        )
    }
    

export default withControl(BtnFloating)
