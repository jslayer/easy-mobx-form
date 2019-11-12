import React from "react";
import { FieldRenderer, FieldValidator } from "..";
import { Field } from "./Field";

const FieldTextAreaRenderer: FieldRenderer = (props) => {
    const {
        value,
        onChange,
        disabled,
        initializing,
        name,
        className,
    } = props;

    const handleChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        onChange(e.currentTarget.value);
    };

    return (
        <>
            <textarea
                name={name}
                onChange={handleChange}
                value={value || ""}
                disabled={disabled || initializing}
                className={className}
            />
        </>
    );
};

export const FieldTextArea: React.FC<{
    name: string;
    validate?: FieldValidator;
    className?: string;
}> = props => <Field
    name={props.name}
    validate={props.validate}
    component={FieldTextAreaRenderer}
    className={props.className}
/>;