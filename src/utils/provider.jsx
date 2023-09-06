'use client';
import React, { useState } from 'react';
import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalStyle from 'styles/globals';

function Providers({ children }) {
  const [client] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error, query) => {
          // 🎉 only show error toasts if we already have data in the cache
          // which indicates a failed background update
          if (query.state.data !== undefined) {
            toast.error(`Something went wrong: ${error.message}`);
          }
        },
      }),
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
      <GlobalStyle />
      <Toaster />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
