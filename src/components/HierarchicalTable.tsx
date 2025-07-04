import { useState } from "react";
import TableRow from "./TableRow";
import { Row } from "../types/types";
import initialData from "../data/data";

const HierarchicalTable = () => {
  const [data, setData] = useState<Row[]>(initialData);

  const getGrandTotal = () => data.reduce((sum, row) => sum + row.value, 0).toFixed(2);
  const updateValue = (id: string, method: "percent" | "value", input: number) => {
    const update = (rows: Row[]): Row[] => {
      return rows.map((row) => {
        if (row.id === id) {
          let newValue = method === "percent" ? row.value + (row.value * input) / 100 : input;
          if (row.children) {
            const total = row.children.reduce((sum, c) => sum + c.value, 0);
            const updatedChildren = row.children.map((child) => {
              const ratio = child.value / total;
              const childVal = parseFloat((ratio * newValue).toFixed(4));
              return { ...child, value: childVal };
            });
            newValue = updatedChildren.reduce((sum, c) => sum + c.value, 0);
            return { ...row, value: newValue, children: updatedChildren };
          } else {
            return { ...row, value: newValue };
          }
        } else if (row.children) {
          const updatedChildren = update(row.children);
          const newSubtotal = updatedChildren.reduce((sum, c) => sum + c.value, 0);
          return { ...row, value: newSubtotal, children: updatedChildren };
        }
        return row;
      });
    };
    setData(update(data));
  };

  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              level={0}
              onUpdate={updateValue}
            />
          ))}
          <tr>
            <td>
              <strong>Grand Total</strong>
            </td>
            <td>
              <strong>{getGrandTotal()}</strong>
            </td>
            <td colSpan={4}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HierarchicalTable;
