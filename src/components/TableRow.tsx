import React, { useState } from "react";
import { TableRowProps } from "../types/types";
import InputField from "./InputField";
import UpdateButton from "./UpdateButton";

const TableRow: React.FC<TableRowProps> = ({ row, level, onUpdate }) => {
  const [input, setInput] = useState("");

  const variance = row.originalValue !== 0 ? ((row.value - row.originalValue) / row.originalValue) * 100 : 0;

  const handleUpdate = (method: "percent" | "value") => {
    const numericInput = parseFloat(input);
    if (!isNaN(numericInput)) {
      onUpdate(row.id, method, numericInput);
    } else {
      alert("Please Enter Valid Number");
    }
  };

  return (
    <>
      <tr>
        <td style={{ paddingLeft: `${level * 20}px` }}>{row.label}</td>
        <td>{row.value.toFixed(2)}</td>
        <td>
          <InputField value={input} onChange={setInput} />
        </td>
        <td>
          <UpdateButton label="%" onClick={() => handleUpdate("percent")} />
        </td>
        <td>
          <UpdateButton label="Val" onClick={() => handleUpdate("value")} />
        </td>
        <td>{variance.toFixed(2)}%</td>
      </tr>
      {row.children &&
        row.children.map((child) => (
          <TableRow
            key={child.id}
            row={child}
            level={level + 1}
            onUpdate={onUpdate}
          />
        ))}
    </>
  );
};

export default TableRow;
