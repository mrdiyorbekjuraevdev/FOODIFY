"use client"
import FoodifyAuthProvider from '@foodify/auth/provider'
import { DesignSystemProvider } from '@foodify/design-system'
import { getQueryClient } from '@foodify/api/lib/get-query-client'
import { CacheQueryProvider } from '@foodify/api/query'
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useIsAuthenticated } from '@foodify/auth'
import { useRouter } from 'next/navigation'

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = getQueryClient();
    const router = useRouter()
    return (
        <FoodifyAuthProvider>
            <CacheQueryProvider client={queryClient}>
                <DesignSystemProvider>
                    <NuqsAdapter>
                        {children}
                    </NuqsAdapter>
                </DesignSystemProvider>
            </CacheQueryProvider>
        </FoodifyAuthProvider>
    )
}
