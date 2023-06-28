import { format } from 'date-fns';

export const formatDate = (startDate: Date, endDate: Date): string => {
  return `${format(startDate, 'PP')} - ${format(endDate, 'PP')}`;
};
