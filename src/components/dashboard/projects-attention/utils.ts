import { addDays, isWithinInterval } from "date-fns";

export const isWithinDaysFromNow = (date: Date, days: number): boolean => {
  const now = new Date();
  const futureDate = addDays(now, days);
  return isWithinInterval(date, { start: now, end: futureDate });
};