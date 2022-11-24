import React, { FC } from 'react';
import getMonthesNames from '../../Date/getMonthesNames';

interface RenderMonthProps {
  locale: string;
  selectedMonth: any;
  selectedYear: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<any>>;
  setMode: React.Dispatch<React.SetStateAction<'days' | 'monthes' | 'years'>>;
}

const RenderMonths: FC<RenderMonthProps> = ({
  locale,
    selectedMonth,
  setSelectedMonth,
  selectedYear,
  setMode,
}) => {
  // const [selectedMonth, setSelectedMonth] = useState(
  //   createMonth({
  //     date: new Date(selectedDay.year, selectedDay.monthIndex),
  //     locale,
  //   }),
  // );
  return (
    <div className='font-normal text-black text-center grid grid-cols-3 grid-rows-4 gap-1 text-xs'>
      {getMonthesNames(locale).map(monthesName => {
        const isCurrentMonth =
          new Date().getMonth() === monthesName.monthIndex &&
          selectedYear === new Date().getFullYear();
        const isSelectedMonth =
          monthesName.monthIndex === selectedMonth.monthIndex;

        return (
          <div
            key={monthesName.month}
            aria-hidden
            onClick={() => {
              setSelectedMonth(monthesName.monthIndex);
              setMode('days');
            }}
            className={[
              'p-2 flex justify-center items-center cursor-pointer rounded-md',
              isSelectedMonth ? 'text-black bg-white ' : '',
              isCurrentMonth ? 'bg-white' : '',
            ].join(' ')}>
            {monthesName.monthShort}
          </div>
        );
      })}
    </div>
  );
};

export default RenderMonths;
