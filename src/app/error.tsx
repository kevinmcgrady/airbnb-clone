'use client';

import EmptyState from '@/src/components/EmptyState';

const ErrorState: React.FC = () => {
  return <EmptyState title='Oh No' subtitle='Something went wrong' />;
};

export default ErrorState;
