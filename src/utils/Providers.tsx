'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { ThemeProvider } from 'src/app/context/theme-context';

export default function Provider({ children }: { children: React.ReactNode; }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ThemeProvider>
    );
}
