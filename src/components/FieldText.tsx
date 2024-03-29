import React from "react";
import { FieldRenderer, FieldValidator } from "..";
import { Field } from "./Field";

const FieldTextRenderer: FieldRenderer = (props) => {
    const {
        value,
        onChange,
        disabled,
        initializing,
        name,
        className,
    } = props;

    const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };

    return (
        <>
            <input
                type="text"
                name={name}
                onChange={handleChange}
                value={value || ""}
                disabled={disabled || initializing}
                className={className}
            />
        </>
    );
};

export const FieldText: React.FC<{
    name: string;
    validate?: FieldValidator;
    className?: string;
}> = props => <Field
    name={props.name}
    validate={props.validate}
    component={FieldTextRenderer}
    className={props.className}
/>;