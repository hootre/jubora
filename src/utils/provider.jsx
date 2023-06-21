'use client';
import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@material-tailwind/react';
function Providers({ children }) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
          staleTime: 1000 * 100,
          cacheTime: 1000 * 100,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <Toaster />
        {children}client
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default Providers;
