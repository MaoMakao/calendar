import React, { FC } from 'react';
import createDate from './../../Date/CreateDate';
import { getYearsInterval } from './../../Date/getYearsInterval';
import { RenderYearsProps } from './../../../Types/index';



const RenderYears: FC<RenderYearsProps> = ({
  selectedYear,
  setMode,
  setSelectedDay,
}) => {
  

  const updateSelectedYear = (year: number): void => {
    const dayIndex = 1;
    const monthIndex = 0;
    setSelectedDay(createDate({ date: new Date(year, monthIndex, dayIndex) }));
  };

  const selectedYearInterval = getYearsInterval(selectedYear);
  return (
    
        <div className='font-normal text-black text-center grid grid-cols-3 grid-rows-4 gap-1 text-xs w-full h-[92%] '>
          <div className='font-light p-2 text-black w-full h-full flex items-center justify-center shadow-lg'>
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
                  setMode('monthes');
                  updateSelectedYear(year);
                }}
                className={[
                  ' w-full h-full flex items-center justify-center shadow-lg',
                  isCurrentYear ? 'bg-slate-300' : '',
                  isSelectedYear ? 'text-black bg-slate-200' : '',
                ].join(' ')}>
                {year}
              </div>
            );
          })}
          <div className='font-light p-2 text-black w-full h-full flex items-center justify-center shadow-lg '>
            {selectedYearInterval[selectedYearInterval.length - 1] + 1}
          </div>
        </div>
  
  );
};

export default RenderYears;
