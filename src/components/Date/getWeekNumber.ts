export const getWeekNumber = (date: Date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysyear = (date.getTime() - firstDayOfYear.getTime())/86400000;

  return Math.ceil((pastDaysyear + firstDayOfYear.getDay() + 1) / 7);
};
