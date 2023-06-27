import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/src/libs/auth';

export const getAuthSession = () => getServerSession(authOptions);
