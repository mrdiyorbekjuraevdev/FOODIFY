import React from 'react'
import { Card, CardHeader } from '@foodify/design-system/components/card';
import Image from 'next/image';
import hero from '@/public/img/hero.webp';

export const Hero = () => {
    return (
        <Card className="h-full" shadow="none">
            <CardHeader className="absolute z-10 top-10 flex-col !items-center">
                <p className="text-5xl text-white uppercase font-bold">foodify</p>
            </CardHeader>
            <Image
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={hero}
                width={500}
                height={500}
            />
            <CardHeader className="absolute z-10 bottom-5 flex-col !items-center">
                <p className="text-tiny  uppercase font-bold">
                    © 2024 “Foodify”, Barcha huquqlar himoyalangan
                </p>
            </CardHeader>
        </Card>
    )
}
