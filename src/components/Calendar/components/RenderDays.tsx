import React, { FC } from 'react';
import { checkDateIsEqual } from '../../Date/CheckDateIsEqual';
import { checkIsToday } from '../../Date/CheckIsToday';
import createDate from '../../Date/CreateDate';
import createMonth from '../../Date/CreateMonth';
import { getMonthNumberOfDays } from '../../Date/getMonthNumberOfDays';
import { getWeekDaysNames } from '../../Date/getWeekDaysNames';
import { RenderDaysProps } from './../../../Types/index';



const RenderDays: FC<RenderDaysProps> = ({
  locale,
  setSelectedDate,
  selectedDay,
  selectedMonth,
  selectedYear,
  setSelectedDay,
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
    }).getArrayOfDates();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).getArrayOfDates();

    const firstDay = selectedMonth.getArrayOfDates()[0];
    const lastDay = selectedMonth.getArrayOfDates()[monthNumberOfDays - 1];

    const shiftIndex = firstWeekDayNumber - 1;

    const numberOfPrevDays =
      firstDay.getDay() - shiftIndex < 0
        ? 7 - (firstWeekDayNumber - firstDay.getDay())
        : firstDay.getDay() - shiftIndex;

    const numberOfNextDays =
      7 - lastDay.getDay() + shiftIndex > 6
        ? 7 - lastDay.getDay() - (7 - shiftIndex) - 1
        : 7 - lastDay.getDay() + shiftIndex - 1;

    const totalCalendarDays =
      selectedMonth.getArrayOfDates().length +
      numberOfNextDays +
      numberOfPrevDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i++) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }

    for (
      let i = numberOfPrevDays;
      i < totalCalendarDays - numberOfNextDays;
      i++
    ) {
      result[i] = selectedMonth.getArrayOfDates()[i - numberOfPrevDays];
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
      <div className='text-xs font-normal text-center items-center grid grid-cols-7 grid-rows-6 h-[92%] gap-1'>
        {calendarDays().map(day => {
          const isToday = checkIsToday(day);
          const isSelectedDay = checkDateIsEqual(day, selectedDay.date);
          const isAdditionalDay = day.getMonth() !== selectedMonth.monthIndex;

          return (
            <div
              key={day.getTime()}
              onClick={() => {
                 setSelectedDate(day);
                setSelectedDay(createDate({ date: day }));
              }}
              className={[
                'rounded-md p-1 cursor-pointer w-full h-full flex items-center justify-center shadow-lg',
                isToday ? 'bg-violet-300' : '',
                isSelectedDay ? 'bg-slate-300 text-black' : '',
                isAdditionalDay
                  ? 'p-1 font-light cursor-pointer text-black'
                  : '',
              ].join(' ')}>
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RenderDays;
