import { observer } from "mobx-react";
import React, { useContext } from "react";
import { FormContext } from "..";

export const Submit: React.FC<{
    type: "button" | "submit"
    name?: string;
    value?: string;
    className?: string;
}> = observer((props) => {
    const context = useContext(FormContext);

    const onClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        if (props.name) {
            context.handleChange(props.name)(e.currentTarget.value);
        }
    };

    return (
        <button
            name={props.name}
            type={props.type}
            onClick={onClick}
            value={props.value}
            disabled={!context.valid || context.submitting || context.validating || context.initializing}
            className={props.className}
        >
            {props.children}
        </button>
    );
});