type Option<T> = {
  label: string;
  value: T;
};

export type Setting<T> = {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};
