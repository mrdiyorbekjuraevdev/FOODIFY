"use client";
import { useSignIn } from "@foodify/auth";
import { useRouter } from "next/navigation";
import { useMutation } from "@foodify/api/query";
import { useFetch } from "@foodify/api/hooks/useFetch";
import { MutationResult } from "@foodify/api/types";
import { ISignInForm } from "@/types/auth/sign-in";

type ON_SUBMIT = MutationResult<unknown, Error, ISignInForm, unknown>

type TSIGN_IN_FEATURE = {
    onSubmit: ON_SUBMIT
}

export const useSignInFeature = (): TSIGN_IN_FEATURE => {
    const { functionInvoke } = useFetch()
    const signIn = useSignIn();
    const { push } = useRouter();

    const onSubmit: ON_SUBMIT = useMutation({
        mutationFn: async (values: ISignInForm) => {
            const response = await functionInvoke({
                functionName: "api/auth/sign-in",
                method: "POST",
                body: {
                    phone: values.phone,
                    password: values.password,
                }
            })

            console.log(response)
            if (response?.data) {
                // signIn({
                //     auth: {
                //         token: String(response?.data?.accessToken),
                //         type: "Bearer",
                //     },
                //     userState: response?.data?.user,
                // });


            }
        }
    })

    return {
        onSubmit
    }
}