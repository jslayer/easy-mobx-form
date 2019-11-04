import React, { useContext } from "react";
import { FormContext } from "..";
import { observer } from "mobx-react";

const DefaultSubmitErrorMessage: React.FC = props => (
    <div style={{ color: "red" }}>{props.children}</div>
);

export const SubmitErrorMessage: React.FC<{ component?: React.FC }> = observer(props => {
    const context = useContext(FormContext);
    const submitError = context.submitError;
    const Component = props.component || DefaultSubmitErrorMessage;

    return (
        <>{
            submitError ? (
                <Component>{submitError}</Component>
            ) : null
        }</>
    );
});