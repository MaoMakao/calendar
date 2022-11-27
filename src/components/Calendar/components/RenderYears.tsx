import React, { FC, useState } from 'react';
import { DateType } from '../../../Types';
import createDate from './../../Date/CreateDate';

interface RenderYearsProps {
  selectedYear: number;
  setMode: React.Dispatch<React.SetStateAction<'days' | 'monthes' | 'years'>>;
  setSelectedDay: React.Dispatch<React.SetStateAction<DateType>>;
}

const RenderYears: FC<RenderYearsProps> = ({
  selectedYear,
  setMode,
  setSelectedDay,
}) => {
  const getYearsInterval = (year: number) => {
    const startYear = Math.floor(year / 10) * 10; // Че тут творится, зачем делить на 10 и умножать на 10
    return [...Array(10)].map((_, index) => startYear + index);
  };

  const updateSelectedYear = (year: number): void => {
    const dayIndex = 1;
    const monthIndex = 0;
    setSelectedDay(createDate({ date: new Date(year, monthIndex, dayIndex) }));
  };

  const [selectedYearInterval, setSelectedYearInterval] = useState(
    getYearsInterval(selectedYear),
  );

  return (
    <div>
      {
        <div className='font-normal text-black text-center grid grid-cols-3 grid-rows-4 gap-1 text-xs'>
          <div className='font-light p-2 text-black'>
            {selectedYearInterval[0] - 1}
          </div>
          {selectedYearInterval.map(year => {
            const isCurrentYear = new Date().getFullYear() === year;
            const isSelectedYear = year === selectedYear;

            return (
              <div
                key={year}
                aria-hidden
                onClick={() => {
                  // setSelectedYearInterval([year]);
                  setMode('monthes');
                  updateSelectedYear(year);
                }}
                className={[
                  'bg-white',
                  isCurrentYear ? 'bg-blue-500' : '',
                  isSelectedYear ? 'text-black bg-red-600' : '',
                ].join(' ')}>
                {year}
              </div>
            );
          })}
          <div className='font-light p-2 text-black'>
            {selectedYearInterval[selectedYearInterval.length - 1] + 1}
          </div>
        </div>
      }
    </div>
  );
};

export default RenderYears;
