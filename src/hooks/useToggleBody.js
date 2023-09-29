import { useEffect } from 'react';

const useToggleBody = (state) => {
    const toggleBodyScroll = (disable) => {
        if (disable) {
            document.body.classList.add('disable-scroll');
        } else {
            document.body.classList.remove('disable-scroll');
        }
    };

    useEffect(() => {
        toggleBodyScroll(state);
    }, [state]);
};

export default useToggleBody;
