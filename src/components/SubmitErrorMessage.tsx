import React, { useContext } from "react";
import { observer } from "mobx-react";
import { FormContext, SubmitErrorComponent } from "..";

const DefaultSubmitErrorMessage: SubmitErrorComponent = props => (
    <div style={{ color: "red" }}>{
        typeof props.result === "string"
            ? props.result
            : JSON.stringify(props.result)
    }</div>
);

export const SubmitErrorMessage: React.FC<{
    component?: SubmitErrorComponent<any>
}> = observer(props => {
    const context = useContext(FormContext);
    const submitError = context.submitError;
    const Component = props.component || DefaultSubmitErrorMessage;

    return (
        <>{
            submitError ?
                <Component result={submitError}/>
                : null
        }</>
    );
});
