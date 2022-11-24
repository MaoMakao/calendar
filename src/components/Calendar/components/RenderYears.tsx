import React, { FC } from 'react';


interface RenderYearsProps {
  locale?: string;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedDay: any;
  selectedMonth: any;
  selectedYear: number;
selectedYearInterval: number[];
  setSelectedYearInterval: React.Dispatch<React.SetStateAction<number[]>>;
  setMode: React.Dispatch<React.SetStateAction<'days' | 'monthes' | 'years'>>;
  mode:  "days" | "monthes" | "years";
}

const RenderYears: FC<RenderYearsProps> = ({
  locale,
  selectedDate,
  setSelectedDate,
  selectedDay,
  selectedMonth,
  selectedYear,
  selectedYearInterval,
  setMode,
  mode,
  setSelectedYearInterval
}) => {
  return (
    <div>
      {' '}
      {mode === 'years' && (
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
            {selectedYearInterval[selectedYearInterval.length - 1] +
              1}
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderYears;

