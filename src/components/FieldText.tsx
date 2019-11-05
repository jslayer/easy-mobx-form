import React from "react";
import { FieldComponent, FieldValidator } from "..";
import { Field } from "./Field";

const FieldTextRenderer: FieldComponent = (props) => {
    const {
        value,
        error,
        onChange,
        disabled,
        pristine,
        forceError,
        initializing,
        name,
    } = props;

    const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };

    return (
        <div>
            <input
                type="text"
                name={name}
                onChange={handleChange}
                value={value || ""}
                disabled={disabled || initializing}
            />
            {
                error && (forceError || !pristine) ? <div style={{ color: "red" }}>{error}</div> : null
            }
        </div>
    );
};

export const FieldText: React.FC<{
    name: string;
    validate?: FieldValidator;
    errorIfPristine?: boolean;
}> = props => <Field
    name={props.name}
    validate={props.validate}
    component={FieldTextRenderer}
    errorIfPristine={props.errorIfPristine}
/>;