import { FieldRenderer, FieldValidator } from "..";
import { Field } from "./Field";
import React from "react";

type Value = string | number;

const FieldRadioRenderer: FieldRenderer<{value: Value}> = (props) => {
    const {
        value,
        onChange,
        disabled,
        initializing,
        name,
        data,
        className,
    } = props;

    const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        onChange(data.value);
    };

    return (
        <input
            type="radio"
            name={name}
            onChange={handleChange}
            disabled={disabled || initializing}
            value={data.value}
            checked={data.value === value || false}
            className={className}
        />
    );
};

export const FieldRadio: React.FC<{
    name: string;
    value: Value;
    className?: string;
    validate?: FieldValidator;
}> = props => <Field
    name={props.name}
    validate={props.validate}
    component={FieldRadioRenderer}
    className={props.className}
    data={{
        value: props.value
    }}
/>;