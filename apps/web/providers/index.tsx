"use client"
import FoodifyAuthProvider from '@foodify/auth/provider'
import { DesignSystemProvider } from '@foodify/design-system'
import { getQueryClient } from '@foodify/api/lib/get-query-client'
import { CacheQueryProvider } from '@foodify/api/query'
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConfirmProvider } from '@/components/confirm-actions'

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = getQueryClient();
    return (
        <FoodifyAuthProvider>
            <CacheQueryProvider client={queryClient}>
                <DesignSystemProvider>
                    <NuqsAdapter>
                        <ConfirmProvider>
                            {children}
                        </ConfirmProvider>
                    </NuqsAdapter>
                </DesignSystemProvider>
            </CacheQueryProvider>
        </FoodifyAuthProvider>
    )
}
