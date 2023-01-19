export type Modes = 'days' | 'monthes' | 'years';

export type DateType = {
  date: Date;
  dayNumber: number;
  day: string;
  dayNumberInWeek: number;
  dayShort: string;
  year: number;
  yearShort: string;
  month: string;
  monthShort: string;
  monthNumber: number;
  monthIndex: number;
  timestamp: number;
  week: number;
};

export type MonthType = {
  monthName: string;
  monthIndex: number;
  monthNumber: number;
  year: number;
  getDay: (dayNumber: number) => DateType;
  createMonthDays: () => DateType[];
  getArrayOfDates: () => Date[];
};

export type CreateYearType = {
  createYearMonthes: () => DateType[][];
  month: MonthType;
  year: number;
};

export interface IList {
  text: string;
  checked: boolean;
  id: number;
  // __typename?: string;
  time: number;
}
