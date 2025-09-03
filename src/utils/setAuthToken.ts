import jwtDecode from "jwt-decode";

export const setAuthTokens = ({
                                  access,
                                  refresh,
                                  setCookie,
                              }: {
    access: string;
    refresh: string;
    setCookie: any;
}) => {
    try {
        const jwtDecoded: any = jwtDecode(access);
        if (!!jwtDecoded) {
            const cookieExpiresDate = new Date(jwtDecoded.exp * 1000);
            setCookie("access_token", access, {
                path: "/",
                expires: cookieExpiresDate,
            });
            setCookie("refresh_token", refresh, {
                path: "/",
                expires: cookieExpiresDate,
            });
        }
    } catch (err) {
    }
};
