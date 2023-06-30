'use client';

import EmptyState from '@/src/components/EmptyState';

const NotFound: React.FC = () => {
  return <EmptyState title='404' subtitle='This page does not exist!' />;
};

export default NotFound;
