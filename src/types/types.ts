export interface Row {
  id: string;
  label: string;
  value: number;
  originalValue: number;
  children?: Row[];
}

export interface TableRowProps {
  row: Row;
  level: number;
  onUpdate: (id: string, method: "percent" | "value", input: number) => void;
}

export interface InputFieldProps {
    value: string;
    onChange: (value: string) => void;
}

export interface UpdateButtonProps {
    label: string;
    onClick: () => void;
}