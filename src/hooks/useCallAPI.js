import { useState, useCallback } from 'react';

const useCallAPI = () => {
    const [showLoader, setShowLoader] = useState(false);

    const callScriptFunction = useCallback(async (url, formElement) => {
        setShowLoader(true);
        const response = await fetch(url, {
            method: 'POST',
            body: new FormData(formElement),
        });

        setShowLoader(false);
        return response.text();
    }, []);

    return { callScriptFunction, showLoader };
};

export default useCallAPI;
