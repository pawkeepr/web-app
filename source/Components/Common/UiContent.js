import React, { useEffect } from 'react';
const UiContent = () => {
    useEffect(() => {
        const checkbox = document.getElementsByClassName('code-switcher');
        Array.from(checkbox).forEach((check) => {
            check.addEventListener('change', () => {
                const card = check.closest('.card');
                const preview = card.querySelector('.live-preview');
                const code = card.querySelector('.code-view');
                if (check.checked) {
                    // do this
                    preview.classList.add('d-none');
                    code.classList.remove('d-none');
                } else {
                    // do that
                    preview.classList.remove('d-none');
                    code.classList.add('d-none');
                }
            });
        });
    }, []);
    return <div />;
};
export default UiContent;
