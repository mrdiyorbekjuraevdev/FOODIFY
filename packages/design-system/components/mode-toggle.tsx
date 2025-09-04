'use client';

import { MoonIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';


const themes = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];

export const ModeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <button onClick={() => setTheme('dark')}>
      <MoonIcon />
    </button>
  );
};
