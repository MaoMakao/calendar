import { DateType } from '../../Types';
import { getWeekNumber } from './getWeekNumber';



 const createDate = ({locale, date } : {locale?: string, date?: Date}): DateType => {

  

  const d = date ?? new Date();
  const dayNumber = d.getDate();
  const day = d.toLocaleDateString(locale, { weekday: 'long' });
  const dayNumberInWeek = d.getDay() + 1;
  const dayShort = d.toLocaleDateString(locale, { weekday: 'short' });
  const year = d.getFullYear();
  const yearShort = d.toLocaleDateString(locale, { year: '2-digit' });
  const month = d.toLocaleDateString(locale, { month: 'long' });
  const monthShort = d.toLocaleDateString(locale, { month: 'short' });
  const monthNumber = d.getMonth() + 1;
  const monthIndex = d.getMonth();
  const timestamp = d.getTime();
  const week = getWeekNumber(d);

  return {
    date: d,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    timestamp,
    week,
  };
};

export default createDate;

// +++