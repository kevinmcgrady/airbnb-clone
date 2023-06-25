import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/libs/auth';

export const getAuthSession = () => getServerSession(authOptions);
