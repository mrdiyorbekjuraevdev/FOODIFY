import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider } from './providers/theme';

type DesignSystemProviderProperties = ThemeProviderProps & {};

export const DesignSystemProvider = ({
    children,
    ...properties
}: DesignSystemProviderProperties) => (
    <ThemeProvider {...properties}>
        {children}
    </ThemeProvider>
);