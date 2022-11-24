import React, { FC, useState } from 'react';
import createDate from './../../Date/CreateDate';

interface RenderYearsProps {
  selectedYear: number;
  setMode: React.Dispatch<React.SetStateAction<'days' | 'monthes' | 'years'>>;
}

const RenderYears: FC<RenderYearsProps> = ({ selectedYear, setMode }) => {
  const getYearsInterval = (year: number) => {
    const startYear = Math.floor(year / 10) * 10; // Че тут творится, зачем делить на 10 и умножать на 10
  return [...Array(10)].map((_, index) => startYear + index);
  };

  const selectedDay = createDate({});

  const [selectedYearInterval, setSelectedYearInterval] = useState(
    getYearsInterval(selectedDay.year),
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
                  setSelectedYearInterval([year]);
                  setMode('monthes');
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
            {selectedYearInterval[selectedYearInterval.length - 1] + 1}
          </div>
        </div>
      }
    </div>
  );
};

export default RenderYears;
