import React, { useContext } from "react";
import { FormContext, SubmitErrorComponent } from "..";
import { observer } from "mobx-react";

const DefaultSubmitErrorMessage: SubmitErrorComponent = props => (
    <div style={{ color: "red" }}>{
        typeof props.result === "string"
            ? props.result
            : JSON.stringify(props.children)
    }</div>
);

export const SubmitErrorMessage: React.FC<{ component?: React.FC }> = observer(props => {
    const context = useContext(FormContext);
    const submitError = context.submitError;
    const Component = props.component || DefaultSubmitErrorMessage;

    return (
        <>{
            submitError ?
                <Component>{submitError}</Component>
                : null
        }</>
    );
});
