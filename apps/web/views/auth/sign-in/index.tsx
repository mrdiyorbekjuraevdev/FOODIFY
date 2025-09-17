'use client';
import React from 'react'
import { Hero } from './customs/hero';
import { Form } from './customs/form';
import { useIsAuthenticated } from '@foodify/auth';
import { useRouter } from 'next/navigation';

export const SignIn = () => {
    const router = useRouter()
    const isAuthonticated = useIsAuthenticated()
    if (isAuthonticated) {
        router.push('/')
    }
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 h-[100dvh] p-6">
            <Hero />
            <Form />
        </div>
    )
}
