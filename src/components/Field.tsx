import React, { useContext } from "react";
import { FieldComponent, FieldValidator } from "../";
import { observer } from "mobx-react";
import { FormContext } from "..";

export const Field: React.FC<{
    name: string;
    component: FieldComponent;
    validate?: FieldValidator;
    errorIfPristine?: boolean;
}> = observer((props) => {
    const context = useContext(FormContext);
    const Component = props.component;
    const field = context.getField(props.name);

    if (props.validate) {
        context.setupFieldValidator(props.name, props.validate);
    }

    const onChange = context.handleChange(props.name);

    return (
        <Component
            {...field}
            initializing={context.initializing}
            onChange={onChange}
            forceError={props.errorIfPristine}
        />
    );
});