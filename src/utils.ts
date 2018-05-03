type TPredicate = (...args: any[]) => boolean;
type TParser = (text: string) => {};

export const fetchData = (parser: TParser) => (url: string): Promise<{}> => {
  return fetch(url)
    .then(
      (res: Response) => (res.ok ? res.text() : res.text().then(Promise.reject))
    )
    .then((text: string) => parser(text));
};

export const notString = (value: any): boolean => typeof value !== 'string';

export const pipeP = (...fns: Function[]) => (...args: any[]): Promise<any> =>
  fns.reduce(
    (prev: Promise<any>, fn: Function) =>
      prev.then(v => fn(v)).catch(e => Promise.reject(e)),
    Promise.resolve(args)
  );
export const some = (predicate: TPredicate) => (arr: any[]): boolean =>
  arr.some(predicate);
