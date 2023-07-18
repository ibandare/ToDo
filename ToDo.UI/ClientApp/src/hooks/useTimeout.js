import {useCallback, useEffect, useMemo, useRef} from "react";

const useTimeout = (callback, delay) => {
    const timeoutId = useRef(null);

    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        timeoutId.current = setTimeout(savedCallback.current, delay);

        return () => {
            clearTimeout(timeoutId.current);
        };
    }, [delay]);

    const cancel = useCallback(() => {
        clearTimeout(timeoutId.current);
    }, []);

    const reset = useCallback(() => {
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(savedCallback.current, delay);
    }, [delay]);

    return useMemo(() => [cancel, reset], [cancel, reset]);
};

export default useTimeout;
