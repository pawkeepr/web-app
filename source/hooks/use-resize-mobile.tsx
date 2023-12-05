import { useEffect, useState } from "react";

export const MOBILE_SIZE = 767;

const useResizeMobile = () => {
    const [sizeScreen, setSizeScreen] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // Função para atualizar o estado com as dimensões da tela
    const updateSizeScreen = () => {
        setSizeScreen({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    // Efeito para adicionar o ouvinte de redimensionamento quando o componente monta
    useEffect(() => {
        // Adicionar ouvinte de redimensionamento
        window.addEventListener('resize', updateSizeScreen);

        // Remover o ouvinte de redimensionamento quando o componente desmonta
        return () => {
            window.removeEventListener('resize', updateSizeScreen);
        };
    }, []); // A dependência vazia [] garante que o efeito só seja executa

    return {
        isMobile: sizeScreen.width < MOBILE_SIZE,
        sizeScreen,
    }
}

export default useResizeMobile