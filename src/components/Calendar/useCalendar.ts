import { getMonthNumberOfDays } from './../Date/getMonthNumberOfDays';
import React, { useState, useMemo } from 'react';
import createDate from '../Date/CreateDate';
import getMonthesNames from '../Date/getMonthesNames';
import createMonth from '../Date/CreateMonth';
import { getWeekDaysNames } from '../Date/getWeekDaysNames';

interface UseCalendarParams {
  locale?: string;
  selectedDate: Date;
  firstWeekDayNumber?: number;
}

const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10; // Че тут творится, зачем делить на 10 и умножать на 10
  return [...Array(10)].map((_, index) => startYear + index);
};

const useCalendar = ({
  locale = 'default',
  selectedDate: date, // Тут опять переименуешь, зачем?
  firstWeekDayNumber = 2,
}: UseCalendarParams) => {
  const [mode, setMode] = useState<'days' | 'monthes' | 'years'>('monthes'); // Это в Calendar.tsx, и неплохо б еще переключалку этих режимов сверстать

  // Идея с кучей стейтов тут - избыточно сложно и бессмысленно. Оставить один селектедДей в календаре.тсх
  const [selectedDay, setSelectedDay] = useState(createDate({ date }));
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({
      date: new Date(selectedDay.year, selectedDay.monthIndex),
      locale,
    }),
  );
  const [selectedYear, setSelectedYear] = useState(selectedDay.year);
  const [selectedYearInterval, setSelectedYearInterval] = useState(
    getYearsInterval(selectedDay.year),
  );

  // Раскидать это по компонентам где оно нужно
  const monthNames = useMemo(() => getMonthesNames(locale), []);
  const weekDaysNames = React.useMemo(
    () => getWeekDaysNames(firstWeekDayNumber, locale),
    [],
  );
  const days = React.useMemo(
    () => selectedMonth.createMonthDays(),
    [selectedMonth, selectedYear],
  );

  // Это в компонент дней. Там оно будет принимать селектедДей и парсить из него текущий месяц
  const calendarDays = useMemo(() => {
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

    const firstDay = days[0];
    const lastDay = days[monthNumberOfDays - 1];

    const shiftIndex = firstWeekDayNumber - 1;

    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 - shiftIndex < 0
        ? 7 - (firstWeekDayNumber - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - shiftIndex;

    const numberOfNextDays =
      7 - lastDay.dayNumberInWeek + shiftIndex > 6
        ? 7 - lastDay.dayNumberInWeek - (7 - shiftIndex)
        : 7 - lastDay.dayNumberInWeek + shiftIndex;

    const totalCalendarDays = days.length + numberOfNextDays + numberOfPrevDays;

    const result = [];

    // Три почти одинаковых цикла, я б подумал как это сократить
    for (let i = 0; i < numberOfPrevDays; i += 1) { // Не i+=1 a i++
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }

    for (
      let i = numberOfPrevDays;
      i < totalCalendarDays - numberOfNextDays;
      i += 1
    ) {
      result[i] = days[i - numberOfPrevDays];
    }

    for (
      let i = totalCalendarDays - numberOfNextDays;
      i < totalCalendarDays;
      i += 1
    ) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
    }

    return result;
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

  // Это разбить на свитчеры для каждого режима и перенести в календарь.тсх, избавиться от ифов
  const onClickArrow = (direction: 'right' | 'left') => {
    if (mode === 'years' && direction === 'left') {
      return setSelectedYearInterval(
        getYearsInterval(selectedYearInterval[0] - 10),
      );
    }

    if (mode === 'years' && direction === 'right') {
      return setSelectedYearInterval(
        getYearsInterval(selectedYearInterval[0] + 10),
      );
    }

    if (mode === 'monthes' && direction === 'left') {
      const year = selectedYear - 1;
      if (!selectedYearInterval.includes(year))
        setSelectedYearInterval(getYearsInterval(year));
      return setSelectedYear(selectedYear - 1);
    }

    if (mode === 'monthes' && direction === 'right') {
      const year = selectedYear + 1;
      if (!selectedYearInterval.includes(year))
        setSelectedYearInterval(getYearsInterval(year));
      return setSelectedYear(selectedYear + 1);
    }

    if (mode === 'days') {
      const monthIndex =
        direction === 'left'
          ? selectedMonth.monthIndex - 1
          : selectedMonth.monthIndex + 1;
      if (monthIndex === -1) {
        const year = selectedYear - 1;
        setSelectedYear(year);
        if (!selectedYearInterval.includes(year))
          setSelectedYearInterval(getYearsInterval(year));
        return setSelectedMonth(
          createMonth({ date: new Date(selectedYear - 1, 11), locale }),
        );
      }

      if (monthIndex === 12) {
        const year = selectedYear + 1;
        setSelectedYear(year);
        if (!selectedYearInterval.includes(year))
          setSelectedYearInterval(getYearsInterval(year));
        return setSelectedMonth(
          createMonth({ date: new Date(year, 0), locale }),
        );
      }

      setSelectedMonth(
        createMonth({ date: new Date(selectedYear, monthIndex), locale }),
      );
    }
  };

  const setSelectedMonthByIndex = (monthIndex: number) => {
    setSelectedMonth(
      createMonth({ date: new Date(selectedYear, monthIndex), locale }),
    );
  };

  return {
    state: {
      mode,
      calendarDays,
      weekDaysNames,
      monthNames,
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedYearInterval,
    },
    functions: {
      onClickArrow,
      setMode,
      setSelectedDay,
      setSelectedMonthByIndex,
      setSelectedYear,
      setSelectedYearInterval,
    },
  };
};

export default useCalendar;
