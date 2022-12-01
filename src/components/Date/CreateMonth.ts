import {  MonthType } from './../../Types';
import createDate from './CreateDate';
import { getMonthNumberOfDays } from './getMonthNumberOfDays';

const createMonth = ({
  locale,
  date,
}: {
  locale?: string;
  date?: Date;
}): MonthType => {
  //Та же хуйня с возвращаемым, и деструктурируй парамс сразу

  const d = createDate({ date, locale });
  const { month: monthName, year, monthNumber, monthIndex } = d;

  
  const getDate = (dayNumber: number): Date => new Date(year, monthIndex, dayNumber)
  
  const getArrayOfDates = () => {
    const days = [];
    
    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i += 1) {
      days[i] = getDate(i + 1);
    }
    return days;
  };

  const getDay = (dayNumber: number) =>
    createDate({
      date: new Date(year, monthIndex, dayNumber),
      locale,
    });

  const createMonthDays = () => {
    const days = [];

    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i += 1) {
      days[i] = getDay(i + 1);
    }
    return days;
  };

  return {
    getDay,
    monthName,
    monthIndex,
    monthNumber,
    year,
    createMonthDays,
    getArrayOfDates,
  };
};

export default createMonth;

// +++
