import React from "react";
import { InputFieldProps } from "../types/types";

const InputField: React.FC<InputFieldProps> = ({ value, onChange }) => {
    return (
        <input
            type="number"
            value={value}
            min={1}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default InputField;
