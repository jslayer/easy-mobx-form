import React, { useContext } from "react";
import { BaseFieldComponent } from "../";
import { observer } from "mobx-react";
import { FormContext } from "..";

export const Field: BaseFieldComponent = observer((props) => {
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
            data={props.data}
            className={props.className}
        />
    );
});