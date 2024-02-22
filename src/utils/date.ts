export const stringifyDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

type TripleTouple<T> = [T, T, T];

export const parseDate = (date: string) => {
  const [year, month, day] = date
    .split("-")
    .map((n) => parseInt(n)) as TripleTouple<number>;

  return new Date(year, month - 1, day);
};
