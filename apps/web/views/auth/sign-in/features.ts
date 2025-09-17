"use client";
import { useSignIn } from "@foodify/auth";
import { useRouter } from "next/navigation";
import { useMutation } from "@foodify/api/query";
import { useFetch } from "@foodify/api/hooks/useFetch";
import { MutationResult } from "@foodify/api/types";
import { ISignInForm } from "@/types/auth/sign-in";
import { get } from "lodash";
import { toast } from "sonner";

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
            const { data, error } = await functionInvoke({
                functionName: "login",
                method: "POST",
                body: {
                    phone: get(values, "phone"),
                    password: get(values, "password"),
                }
            })

            if (!error) {
                toast.error(get(error, "message"))
            }

            if (data) {
                signIn({
                    auth: {
                        token: String(get(data, "data.access_token")),
                        type: "Bearer",
                    },
                    refresh: String(get(data, "data.refresh_token")),
                    userState: get(data, "data.user"),
                });
                push("/");
            }
        }
    })

    return {
        onSubmit
    }
}