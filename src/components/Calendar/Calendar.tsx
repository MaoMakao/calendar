import React, { useState } from 'react';
import arrowLeft from './../images/arrowLeft.svg';
import ModeSwitcher from './components/ModeSwitcher';
import RenderDays from './components/RenderDays';
import createDate from '../Date/CreateDate';
import createMonth from '../Date/CreateMonth';
import RenderMonths from './components/RenderMonths';
import RenderYears from './components/RenderYears';
import getMonthesNames from './../Date/getMonthesNames';
import { getYearsInterval } from './../Date/getYearsInterval';
import { CalendarProps } from '../../Types';



const Calendar: React.FC<CalendarProps> = ({
  locale = 'default',
  selectedDate,
  setSelectedDate,
  firstWeekDayNumber = 2,
}) => {
  const [mode, setMode] = useState<'days' | 'monthes' | 'years'>('monthes');

  const [selectedDay, setSelectedDay] = useState(
    createDate({ date: new Date()}),
  );

  const selectedMonth = createMonth({
    date: new Date(selectedDay.year, selectedDay.monthIndex),
    locale,
  });
  const selectedYear = selectedDay.year;

  const renderComponents = {
    days: (
      <RenderDays
        locale={locale}
        setSelectedDate={setSelectedDate}
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedDay={setSelectedDay}
      />
    ),
    monthes: (
      <RenderMonths
        locale={locale}
        selectedMonth={selectedMonth}
        setSelectedDay={setSelectedDay}
        selectedYear={selectedYear}
        setMode={setMode}
      />
    ),
    years: (
      <RenderYears
        selectedYear={selectedYear}
        setMode={setMode}
        setSelectedDay={setSelectedDay}
      />
    ),
  };

  const onClickArrow = {
    years: (direction: -1 | 1): void => {
      const tenYears = direction * 10;
      setSelectedDay(
        createDate({
          date: new Date(
            selectedYear + tenYears,
            selectedMonth.monthIndex,
            selectedDay.dayNumber,
          ),
        }),
      );
    },
    monthes: (direction: -1 | 1): void => {
      setSelectedDay(
        createDate({
          date: new Date(
            selectedYear + direction,
            selectedMonth.monthIndex,
            selectedDay.dayNumber,
          ),
        }),
      );
    },
    days: (direction: -1 | 1): void => {
      if (selectedMonth.monthIndex + direction > 11) {
        setSelectedDay(
          createDate({
            date: new Date(selectedYear + direction, 0, selectedDay.dayNumber),
          }),
        );
        return;
      }
      if (selectedMonth.monthIndex + direction < 0) {
        setSelectedDay(
          createDate({
            date: new Date(selectedYear + direction, 11, selectedDay.dayNumber),
          }),
        );
        return;
      }

      setSelectedDay(
        createDate({
          date: new Date(
            selectedYear,
            selectedMonth.monthIndex + direction,
            selectedDay.dayNumber,
          ),
        }),
      );
    },
  };

  return (
    <div className=' flex items-center justify-center flex-col w-3/4 h-[80%] '>
      <ModeSwitcher setMode={setMode} />

      <div className='w-full h-full rounded-md capitalize bg-white cursor-pointer'>
        <div className='relative rounded-md bg-white text-black  p-2 flex justify-between items-center shadow-md'>
          <img
            alt='AA'
            src={arrowLeft}
            aria-hidden
            className=' cursor-pointer bg-gradient-to-t '
            onClick={() => onClickArrow[mode](-1)} 
          />
          {mode === 'days' && (
            <div aria-hidden>
              {getMonthesNames(locale)[selectedMonth.monthIndex].month}{' '}
              {selectedYear}
            </div>
          )}
          {mode === 'monthes' && (
            <div aria-hidden onClick={() => setMode('years')}>
              {selectedYear}
            </div>
          )}
          {mode === 'years' && (
            <div>
              {getYearsInterval(selectedYear)[0]} -{' '}
              {
                getYearsInterval(selectedYear)[
                  getYearsInterval(selectedYear).length - 1
                ]
              }
            </div>
          )}
          <img
            alt='AA'
            src={arrowLeft}
            aria-hidden
            className=' cursor-pointer  rotate-180'
            onClick={() => onClickArrow[mode](1)}
          />
        </div>

        {renderComponents[mode]}
      </div>
    </div>
  );
};

export default Calendar;
