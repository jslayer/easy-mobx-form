import React, { useContext } from "react";
import { observer } from "mobx-react";
import { FormContext, PossibleErrors } from "..";

const DefaultError: React.FC = props => (
    <span style={{ color: "red" }}>{props.children}</span>
);

export const Error: React.FC<{
    name: string;
    component?: React.FC;
}> = observer((props) => {
    const context = useContext(FormContext);
    const message = context.errors && (context.errors as PossibleErrors<any>)[props.name];
    const Component = props.component || DefaultError;

    return (
        message ? <Component>{message}</Component> : null
    );
});