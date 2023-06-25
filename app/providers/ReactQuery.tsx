'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

type ReactQueryProps = {
  children: React.ReactNode;
};

export const ReactQueryProvider: React.FC<ReactQueryProps> = ({ children }) => {
  const [client] = useState(new QueryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
