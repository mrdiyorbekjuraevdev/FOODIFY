'use client';
import React from 'react'
import { Hero } from './customs/hero';
import { Form } from './customs/form';

export const SignIn = () => {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 h-[100dvh] p-6">
            <Hero />
            <Form />
        </div>
    )
}
