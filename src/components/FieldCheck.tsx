import { FieldComponent, FieldValidator } from "../types";
import { Field } from "./Field";
import React from "react";

const FieldCheckRenderer: FieldComponent = (props) => {
    const { value, onChange, disabled, initializing } = props;

    const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked);
    };

    return (
        <input
            type="checkbox"
            onChange={handleChange}
            disabled={disabled || initializing}
            checked={value || false}
        />
    );
};

export const FieldCheck: React.FC<{
    name: string;
    validate?: FieldValidator;
    errorIfPristine?: boolean;
}> = props => <Field
    name={props.name}
    validate={props.validate}
    component={FieldCheckRenderer}
    errorIfPristine={props.errorIfPristine}
/>;