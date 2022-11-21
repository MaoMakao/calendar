import { getWeekNumber } from './getWeekNumber';
interface CreateDateParams {
  locale?: string;
  date?: Date;
}

// interface SelectedDate { // Такая хуйян должна присутствовать
//   date: Date;
//   dayNumber: number;
//   day: string;
//   dayNumberInWeek: number;
//   dayShort: string;
//   year: number;
//   yearShort: string;
//   month: string;
//   monthShort: string;
//   monthNumber: number;
//   monthIndex: number;
//   timestamp: number;
//   week: number;
// }

const createDate = (params?: CreateDateParams) => { // Типизируй возвращаемое значение
// const createDate = ({locale, date } : {locale?: string, date?: Date}): SelectedDate => { // Отак пизже

  const locale = params?.locale ?? 'default';

  const d = params?.date ?? new Date();
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
