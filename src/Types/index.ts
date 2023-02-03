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

export interface IToDo {
  text: string;
  checked: boolean;
  id: number;
  time: string;
  __typename?: string;
}

export interface allTodosCache {
  allDays: IToDo[];
}

export interface ITodoItemProps {
  item: IToDo;
  handleRemove: (id: number | string) => void;
  handleUpdate: (
    id: number | string,
    text: string,
    checked: boolean,
    time?: string,
  ) => void;
}

export type CurrentType = {
  id: number;
  dayTime: string;
  allTodos: IToDo[];
  todos: IToDo[];
};

export interface RenderDaysProps {
  locale?: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedDay: DateType;
  selectedMonth: MonthType;
  selectedYear: number;
  setSelectedDay: React.Dispatch<React.SetStateAction<DateType>>;
}

export interface RenderMonthProps {
  locale: string;
  selectedMonth: any;
  selectedYear: number;
  setSelectedDay: React.Dispatch<React.SetStateAction<DateType>>;
  setMode: React.Dispatch<React.SetStateAction<'days' | 'monthes' | 'years'>>;
}


export interface RenderYearsProps {
  selectedYear: number;
  setMode: React.Dispatch<React.SetStateAction<'days' | 'monthes' | 'years'>>;
  setSelectedDay: React.Dispatch<React.SetStateAction<DateType>>;
}

export interface CalendarProps {
  locale?: string;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  firstWeekDayNumber?: number;
}

export interface CardOfToDosProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedDate: Date | null;
}