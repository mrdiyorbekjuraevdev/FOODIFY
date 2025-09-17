import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider } from './providers/theme';
import { ReactScan } from './lib/react-scan';
import { ToastProvider } from "@foodify/design-system/components/sooner";
type DesignSystemProviderProperties = ThemeProviderProps & {};

export const DesignSystemProvider = ({
    children,
    ...properties
}: DesignSystemProviderProperties) => (
    <ThemeProvider {...properties}>
        {children}
        {process.env.NODE_ENV === "development" && <ReactScan />}
        <ToastProvider />
    </ThemeProvider>
);