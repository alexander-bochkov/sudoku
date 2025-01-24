interface Option<T> {
  label: string;
  value: T;
}

export interface Setting<T> {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}
