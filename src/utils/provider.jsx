'use client';
import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
    <QueryClientProvider client={client}>
      {children}client
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
