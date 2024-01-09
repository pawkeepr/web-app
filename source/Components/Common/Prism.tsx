import Prism from 'prismjs';
import React, { useEffect, useRef } from 'react';

const PrismCode = (props) => {
    const ref = useRef();

    useEffect(() => {
        highlight();
    }, []);

    const highlight = () => {
        if (ref?.current) {
            Prism.highlightElement(ref.current);
        }
    };

    const { code, language } = props;
    return (
        <React.Fragment>
            <pre className="line-numbers">
                <code ref={ref} className={`language-${language}`}>
                    {code.trim()}
                </code>
            </pre>
        </React.Fragment>
    );
};

export default PrismCode;
