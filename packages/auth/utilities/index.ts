import httpClient from "@foodify/api/lib/axios-client";
import createRefresh from "react-auth-kit/createRefresh";

type TData = {
    data: {
        accessToken: string;
        refreshToken: string;
    };
};

export const refresh = createRefresh({
    interval: 10, // The time in sec to refresh the Access token,
    //@ts-ignore
    refreshApiCallback: async (param) => {
        try {
            const response = await httpClient.post<TData>("auth/refresh", param, {
                headers: { Authorization: `Bearer ${param.authToken}` },
            });
            console.log("Refreshing", response, param);
            return {
                isSuccess: true,
                newAuthToken: response?.data?.accessToken,
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
