import { useCallback, useEffect, useState } from 'react';

const useSteps = (steps: unknown[] = [], selectedTabInitial = 0) => {
    const [selectedTab, setSelectedTab] = useState(selectedTabInitial);

    useEffect(() => {
        return () => {
            setSelectedTab(0);
        };
    }, []);

    const onChangeSelectedTab = (index: number) => {
        setSelectedTab(index);
    };

    const nextStep = useCallback(() => {
        setSelectedTab((state) => Math.min(state + 1, steps.length - 1));
    }, [steps]);

    const previousStep = useCallback(() => {
        setSelectedTab((state) => Math.max(state - 1, 0));
    }, []);

    return {
        selectedTab,
        onChangeSelectedTab,
        nextStep,
        previousStep,
    };
};

export default useSteps;
