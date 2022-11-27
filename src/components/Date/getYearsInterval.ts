

export const getYearsInterval = (year: number) => {
    const startYear = Math.floor(year / 10) * 10; 
    return [...Array(10)].map((_, index) => startYear + index);
  };