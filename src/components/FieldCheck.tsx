import { FieldRenderer, FieldValidator } from "..";
import { Field } from "./Field";
import React from "react";

const FieldCheckRenderer: FieldRenderer = (props) => {
    const {
        value,
        onChange,
        disabled,
        initializing,
        name,
        className,
    } = props;

    const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked);
    };

    return (
        <input
            type="checkbox"
            name={name}
            onChange={handleChange}
            disabled={disabled || initializing}
            checked={value || false}
            className={className}
        />
    );
};

export const FieldCheck: React.FC<{
    name: string;
    validate?: FieldValidator;
    className?: string;
}> = props => <Field
    name={props.name}
    validate={props.validate}
    component={FieldCheckRenderer}
    className={props.className}
/>;