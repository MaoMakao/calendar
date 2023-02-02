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

// export type GetMonthesNamesType = {
//   const monthesNames: {
//     month: ReturnType<typeof createDate>['month'];
//     monthShort: ReturnType<typeof createDate>['monthShort'];
//     monthIndex: ReturnType<typeof createDate>['monthIndex'];
//     date: ReturnType<typeof createDate>['date'];
// }[]

// }
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
  handleRemove:  (id: number | string) => void;
  handleUpdate: (id: number | string, text: string, checked: boolean, time?: string) => void;
}

export type CurrentType = {
id: number,
dayTime: string,
allTodos: IToDo[],
todos: IToDo[]
}