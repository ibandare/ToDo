import {useToasts} from "../toastsSlice";
import Toast from "./Toast";

const Toasts = () => {
    const notifications = useToasts();

    return (
        <>
            {notifications.map(({id, ...rest}) => (
                <Toast key={id} id={id} {...rest} />
            ))}
        </>
    )
}
export default Toasts;
