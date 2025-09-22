import httpClient from "@foodify/api/lib/axios-client";
import createRefresh from "react-auth-kit/createRefresh";
import { get } from "lodash";

type TData = {
    data: {
        access_token: string;
        refresh_token: string;
    };
};

export const refresh = createRefresh({
    interval: 10, // The time in sec to refresh the Access token,
    //@ts-ignore
    refreshApiCallback: async (param) => {
        try {
            const { data } = await httpClient.post<TData>("refresh", { refresh_token: param.refreshToken }, {
                headers: { Authorization: `Bearer ${param.authToken}` },
            });
            return {
                isSuccess: true,
                newAuthToken: get(data, "data.access_token"),
                newAuthTokenExpireIn: 10,
                newRefreshTokenExpiresIn: 60,
            };
        } catch (error) {
            console.error(error);
            return {
                isSuccess: false,
            };
        }
    },
});
