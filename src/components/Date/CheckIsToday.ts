
import { checkDateIsEqual } from './CheckDateIsEqual';

export const checkIsToday = (date: Date) => { //Опять типизируй возвращаемое
  const today = new Date();

  return checkDateIsEqual(today, date);
};