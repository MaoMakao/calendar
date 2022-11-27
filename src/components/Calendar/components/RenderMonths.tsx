import React, { FC } from 'react';
import { DateType } from '../../../Types';
import createDate from '../../Date/CreateDate';
import getMonthesNames from '../../Date/getMonthesNames';

interface RenderMonthProps {
  locale: string;
  selectedMonth: any;
  selectedYear: number;
  setSelectedDay: React.Dispatch<React.SetStateAction<DateType>>;
  setMode: React.Dispatch<React.SetStateAction<'days' | 'monthes' | 'years'>>;
}

const RenderMonths: FC<RenderMonthProps> = ({
  locale,
  selectedMonth,
  setSelectedDay,
  selectedYear,
  setMode,
}) => {
  const updateSelectedMonth = (monthIndex: number): void => {
    const dayIndex = 1;
    setSelectedDay(
      createDate({ date: new Date(selectedYear, monthIndex, dayIndex) }),
    );
  };
  // monthIndex, year, dayIndex=1

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
              updateSelectedMonth(monthesName.monthIndex);
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
