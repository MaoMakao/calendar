import createDate from "./CreateDate";
import { getMonthNumberOfDays } from "./getMonthNumberOfDays";

interface CreateMonthParams {
  locale?: string;
  date?: Date;
}

const createMonth = (params?: CreateMonthParams)  => { //Та же хуйня с возвращаемым, и деструктурируй парамс сразу 
  const locale = params?.locale ?? "default";
  const date = params?.date ?? new Date();

  const d = createDate({ date, locale });
  const { month: monthName, year, monthNumber, monthIndex } = d;

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
  };
};

export default createMonth;
