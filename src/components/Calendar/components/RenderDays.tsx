import React, { FC } from 'react';
import { checkDateIsEqual } from '../../Date/CheckDateIsEqual';
import { checkIsToday } from '../../Date/CheckIsToday';
import createMonth from '../../Date/CreateMonth';
import { getMonthNumberOfDays } from '../../Date/getMonthNumberOfDays';
import { getWeekDaysNames } from '../../Date/getWeekDaysNames';

interface RenderDaysProps {
  locale?: string;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedDay: any;
  selectedMonth: any;
  selectedYear: number;
}

const RenderDays: FC<RenderDaysProps> = ({
  locale,
  selectedDate,
  setSelectedDate,
  selectedDay,
  selectedMonth,
  selectedYear,
}) => {
  const firstWeekDayNumber = 2;

  const calendarDays = () => {
    const monthNumberOfDays = getMonthNumberOfDays(
      selectedMonth.monthIndex,
      selectedYear,
    );

    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

    const firstDay = selectedMonth.createMonthDays()[0];
    const lastDay = selectedMonth.createMonthDays()[monthNumberOfDays - 1];

    const shiftIndex = firstWeekDayNumber - 1;

    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 - shiftIndex < 0
        ? 7 - (firstWeekDayNumber - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - shiftIndex;

    const numberOfNextDays =
      7 - lastDay.dayNumberInWeek + shiftIndex > 6
        ? 7 - lastDay.dayNumberInWeek - (7 - shiftIndex)
        : 7 - lastDay.dayNumberInWeek + shiftIndex;

    const totalCalendarDays =
      selectedMonth.createMonthDays().length +
      numberOfNextDays +
      numberOfPrevDays;

    const result = [];

    // Три почти одинаковых цикла, я б подумал как это сократить
    for (let i = 0; i < numberOfPrevDays; i += 1) {
      // Не i+=1 a i++
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }

    for (
      let i = numberOfPrevDays;
      i < totalCalendarDays - numberOfNextDays;
      i += 1
    ) {
      result[i] = selectedMonth.createMonthDays()[i - numberOfPrevDays];
    }

    for (
      let i = totalCalendarDays - numberOfNextDays;
      i < totalCalendarDays;
      i += 1
    ) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
    }

    return result;
  };

  return (
    <>
      <div className='h-5 font-semibold text-xs text-center items-center grid grid-cols-7 gap-1 '>
        {getWeekDaysNames(firstWeekDayNumber, locale).map(weekDaysName => (
          <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
        ))}
      </div>
      <div className='text-xs font-normal text-center items-center grid grid-cols-7 grid-rows-1 gap-1'>
        {calendarDays().map(day => {
          const isToday = checkIsToday(day.date);
          const isSelectedDay = checkDateIsEqual(day.date, selectedDay.date);
          const isAdditionalDay = day.monthIndex !== selectedMonth.monthIndex;

          return (
            <div
              key={`${day.dayNumber}-${day.monthIndex}`}
              aria-hidden
              onClick={() => setSelectedDate(day.date)}
              className={[
                'rounded-md p-1 cursor-pointer',
                isToday ? 'bg-white' : '',
                isSelectedDay ? 'bg-white text-black' : '',
                isAdditionalDay
                  ? 'p-1 font-light cursor-pointer text-black'
                  : '',
              ].join(' ')}>
              {day.dayNumber}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RenderDays;
