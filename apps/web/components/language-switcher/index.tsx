'use client';

import { Button } from '@foodify/design-system/components/button';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from '@foodify/design-system/components/dropdown';
import { Languages } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

const languages = [
    { label: 'en English', value: 'en' },
    { label: '🇷🇺 Русский', value: 'ru' },
    { label: '🇺🇿 O`zbekcha', value: 'uz' },
];

export const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const switchLanguage = (locale: string) => {
        const defaultLocale = 'en';
        let newPathname = pathname;

        // Case 1: If current locale is default and missing from the URL
        if (
            !pathname.startsWith(`/${params.locale}`) &&
            params.locale === defaultLocale
        ) {
            // Add the default locale to the beginning to normalize
            newPathname = `/${params.locale}${pathname}`;
        }

        // Replace current locale with the selected one
        newPathname = newPathname.replace(`/${params.locale}`, `/${locale}`);
        console.log(newPathname);

        router.push(newPathname);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered" isIconOnly>
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                {languages.map(({ label, value }) => (
                    <DropdownItem key={value} onClick={() => switchLanguage(value)}>
                        {label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};