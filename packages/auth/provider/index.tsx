"use client";
import React, { useEffect, useState } from 'react';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit/AuthProvider';
import { refresh } from '../utilities';

interface FoodifyAuthProviderProps {
    children: React.ReactNode,
}

const FoodifyAuthProvider = ({
    children,
}: FoodifyAuthProviderProps) => {

    const [store, setStore] = useState<any | null>(null);

    useEffect(() => {
        const clientStore = createStore({
            authName: "_foodify_auth",
            authType: "cookie",
            cookieDomain: window.location.hostname,
            cookieSecure: window.location.protocol === "https:",
            refresh,
        });
        setStore(clientStore);
    }, []);

    if (!store) return null;


    return (
        <AuthProvider store={store}>
            {children}
        </AuthProvider>
    )
}

export default FoodifyAuthProvider;