import React from "react";
import { UpdateButtonProps } from "../types/types";

const UpdateButton: React.FC<UpdateButtonProps> = ({ label, onClick }) => {
    return <button onClick={onClick}>{label}</button>;
};

export default UpdateButton;
