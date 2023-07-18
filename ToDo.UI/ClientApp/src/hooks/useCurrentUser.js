import {useGetCurrentUserQuery} from "../app/services/api";
import {useMemo} from "react";

const getClaim = (name) => ({type}) => type === name

const useCurrentUser = () => {
    const {data} = useGetCurrentUserQuery();

    return useMemo(() => {
        if (!data) {
            return null;
        }
        const logoutUrl = data?.find(getClaim("bff:logout_url"))?.value ?? "/bff/logout";
        const name = data?.find(getClaim("name"))?.value ?? data?.find(getClaim("sub"))?.value;
        return {logoutUrl, name};
    }, [data]);
}

export default useCurrentUser;
