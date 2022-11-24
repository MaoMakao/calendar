import React, { useState } from 'react';
import useCalendar from './useCalendar';
import arrowLeft from './../images/arrowLeft.svg'; // Добавь в конце пути .svg
import ModeSwitcher from './components/ModeSwitcher';
import RenderDays from './components/RenderDays';
import createDate from '../Date/CreateDate';
import createMonth from '../Date/CreateMonth';
import RenderMonths from './components/RenderMonths';
import RenderYears from './components/RenderYears';

interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  firstWeekDayNumber?: number;
}

// Здесь обьект с компонентами на каждый режим

// И объект с функциями переключалок

const Calendar: React.FC<CalendarProps> = ({
  locale = 'default',
  selectedDate,
  setSelectedDate,
  firstWeekDayNumber = 2,
}) => {
  //  Здесь должен быть стейт режима и стейт дня. Может стейт месяца и года для разных режимов, хз
  const [mode, setMode] = useState<'days' | 'monthes' | 'years'>('monthes');

  const { functions, state } = useCalendar({
    locale,
    selectedDate,
    firstWeekDayNumber,
  });

  const selectedDay = createDate({ date: selectedDate });
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({
      date: new Date(selectedDay.year, selectedDay.monthIndex),
      locale,
    }),
  );
  const selectedYear = selectedDay.year;

  const renderComponents = {
    days: (
      <RenderDays
        locale={locale}
        setSelectedDate={setSelectedDate}
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    ),
    monthes: (
      <RenderMonths
        locale={locale}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setMode={setMode}
      />
    ),
    years: (
      <RenderYears
        selectedYear={selectedYear}
        selectedYearInterval={selectedYearInterval}
        setMode={setMode}
        setSelectedYearInterval={setSelectedYearInterval}
      />
    ),
  };

  return (
    <>
      <ModeSwitcher setMode={setMode} />

      <div className='w-52 rounded-md capitalize bg-white'>
        <div className='relative rounded-md bg-white text-black  p-2 flex justify-between items-center shadow-md'>
          <img
            alt='AA'
            src={arrowLeft}
            aria-hidden
            className='w-2 h-4 cursor-pointer bg-gradient-to-t '
            onClick={() => functions.onClickArrow('left')} // Тут из объекта достаешь переключалку для конкретного режима и даешь ей допустим -1
          />
          {mode === 'days' && ( // Тоже сделать объект с этими штуками и доставать нужную по режиму
            <div aria-hidden onClick={() => functions.setMode('monthes')}>
              {state.monthNames[state.selectedMonth.monthIndex].month}{' '}
              {state.selectedYear}
            </div>
          )}
          {state.mode === 'monthes' && (
            <div aria-hidden onClick={() => functions.setMode('years')}>
              {state.selectedYear}
            </div>
          )}
          {state.mode === 'years' && (
            <div>
              {state.selectedYearInterval[0]} -{' '}
              {
                state.selectedYearInterval[
                  state.selectedYearInterval.length - 1
                ]
              }
            </div>
          )}
          <img
            alt='AA'
            aria-hidden
            className='w-2 h-4 cursor-pointer bg-gradient-to-t transform'
            onClick={() => functions.onClickArrow('right')}
          />
        </div>
        <div className='rounded-md p-2'>
          {/* {mode === 'days' && (
            <RenderDays
              locale={locale}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedDay={selectedDay}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
            />
          )} */}
          {/* <>
              <div className='h-5 font-semibold text-xs text-center items-center grid grid-cols-7 gap-1 '>
                {state.weekDaysNames.map(weekDaysName => (
                  <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
                ))}
              </div>
              <div className='text-xs font-normal text-center items-center grid grid-cols-7 grid-rows-1 gap-1'>
                {state.calendarDays.map(day => {
                  const isToday = checkIsToday(day.date);
                  const isSelectedDay = checkDateIsEqual(
                    day.date,
                    state.selectedDay.date,
                  );
                  const isAdditionalDay =
                    day.monthIndex !== state.selectedMonth.monthIndex;

                  return (
                    <div
                      key={`${day.dayNumber}-${day.monthIndex}`}
                      aria-hidden
                      onClick={() => {
                        functions.setSelectedDay(day);
                        setSelectedDate(day.date);
                      }}
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
            </> */}

          {/* Чтоб не проверять режим через && */}

          {/* В отдельный компонент */}
          {renderComponents[mode]}
          {/* // (
          //   <RenderMonths
          //     locale={locale}
          //     selectedDay={selectedDay}
          //     selectedMonth={selectedMonth}
          //     setSelectedMonth={setSelectedMonth}
          //     selectedYear={selectedYear}
          //     setMode={setMode}
            />
            // <div className='font-normal text-black text-center grid grid-cols-3 grid-rows-4 gap-1 text-xs'>
            //   {state.monthNames.map(monthesName => {
            //     const isCurrentMonth =
            //       new Date().getMonth() === monthesName.monthIndex &&
            //       state.selectedYear === new Date().getFullYear();
            //     const isSelectedMonth =
            //       monthesName.monthIndex === state.selectedMonth.monthIndex;

            //     return (
            //       <div
            //         key={monthesName.month}
            //         aria-hidden
            //         onClick={() => {
            //           functions.setSelectedMonthByIndex(monthesName.monthIndex);
            //           functions.setMode('days');
            //         }}
            //         className={[
            //           'p-2 flex justify-center items-center cursor-pointer rounded-md',
            //           isSelectedMonth ? 'text-black bg-white ' : '',
            //           isCurrentMonth ? 'bg-white' : '',
            //         ].join(' ')}>
            //         {monthesName.monthShort}
            //       </div>
            //     );
            //   })}
            // </div> */}

          {/* В отдельный компонент */}
          {/* {mode === 'years' && (
            <div className='font-normal text-black text-center grid grid-cols-3 grid-rows-4 gap-1 text-xs'>
              <div className='font-light p-2 text-black'>
                {state.selectedYearInterval[0] - 1}
              </div>
              {state.selectedYearInterval.map(year => {
                const isCurrentYear = new Date().getFullYear() === year;
                const isSelectedYear = year === state.selectedYear;

                return (
                  <div
                    key={year}
                    aria-hidden
                    onClick={() => {
                      functions.setSelectedYear(year);
                      functions.setMode('monthes');
                    }}
                    className={[
                      'bg-white',
                      isCurrentYear ? 'bg-white' : '',
                      isSelectedYear ? 'text-black bg-white' : '',
                    ].join(' ')}>
                    {year}
                  </div>
                );
              })}
              <div className='font-light p-2 text-black'>
                {state.selectedYearInterval[
                  state.selectedYearInterval.length - 1
                ] + 1}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Calendar;
