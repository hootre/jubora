'use client';
import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import StyledComponentsRegistry from 'utils/registry';
function Providers({ children }) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
          staleTime: 1000 * 40,
          cacheTime: 1000 * 40,
        },
      },
    })
  );

  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={client}>
        <Toaster />
        {children}client
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StyledComponentsRegistry>
  );
}

export default Providers;
