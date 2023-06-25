'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ReactQueryProps = {
  children: React.ReactNode;
};

export const ReactQueryProvider: React.FC<ReactQueryProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
