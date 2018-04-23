interface Option<T> {
  label: string;
  value: T;
}

type Options<T> = Option<T>[];

export {
  Option,
  Options,
}
