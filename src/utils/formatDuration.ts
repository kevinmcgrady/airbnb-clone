import { differenceInCalendarDays } from 'date-fns';

export const formatDuration = (
  startDate: Date | string,
  endDate: Date | string,
): number => {
  let diff = differenceInCalendarDays(new Date(endDate), new Date(startDate));

  return diff;
};
