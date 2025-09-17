
"use client"

import * as React from "react";
import { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIsAuthenticated } from "@foodify/auth";

export function withAuthenticatedRoute<P>(
    WrappedComponent: ComponentType<P>
) {
    const ComponentWithAuth = (props: P) => {
        const isAuthenticated = useIsAuthenticated()
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) {
                router.replace("/sign-in");
            }
        }, []);

        if (isAuthenticated) {
            // optionally render loader until redirect
            return router.replace("/");
        }

        return <WrappedComponent {...props!} />;
    };

    ComponentWithAuth.displayName = `withAuthenticatedRoute(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return ComponentWithAuth;
}
