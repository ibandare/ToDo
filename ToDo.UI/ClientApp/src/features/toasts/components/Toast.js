import {dismissToast} from "../toastsSlice";
import {connect} from "react-redux";
import {useCallback, useEffect, useRef} from "react";
import {Alert} from "reactstrap";

const Toast = ({id, type = "info", message, duration = 5000, isClosable, dismissToast}) => {

    const timeoutId = useRef(null);
    const handleMouseIn = useRef(null);
    const handleMouseOut = useRef(null);


    const handleDismiss = useCallback(() => {
        dismissToast(id);
    }, [dismissToast, id]);

    useEffect(() => {
        if (!duration) {
            handleMouseIn.current = null;
            handleMouseIn.handleMouseOut = null;
            return;
        }

        const start = () => {
            timeoutId.current = setTimeout(() => {
                handleDismiss();
            }, duration);
        };
        const cancel = () => {
            clearTimeout(timeoutId.current);
        }
        handleMouseIn.current = cancel;
        handleMouseOut.current = () => {
            cancel();
            start();
        }
        start();
        return cancel;
    }, [duration, handleDismiss]);


    return (
        <Alert color={type}
               onMouseIn={handleMouseIn.current}
               onMouseOut={handleMouseOut.current}
               toggle={handleDismiss}>
            {message}
        </Alert>
    )
}

export default connect(null, {dismissToast})(Toast);
