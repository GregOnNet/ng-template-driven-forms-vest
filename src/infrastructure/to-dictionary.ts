export interface Dictionary<T> {
  [key: string | number | symbol]: T;
}

export function toDictionary<T, U>(
  entries: T[],
  selectId: (entry: T) => string | number | symbol,
  map: (entry: T) => U
): Dictionary<U>;
export function toDictionary<T>(
  entries: T[],
  selectId: (entry: T) => string | number | symbol
): Dictionary<T>;
export function toDictionary<T, U>(
  entries: T[],
  selectId: (entry: T) => string | number | symbol,
  map?: (entry: T) => U
): Dictionary<T | U> {
  return entries.reduce((dictionary, entry) => {
    const entryId = selectId(entry);
    const entryMapped = !!map ? map(entry) : entry;

    return Object.assign(dictionary, { [entryId]: entryMapped });
  }, {});
}
