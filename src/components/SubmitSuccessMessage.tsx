import React, { useContext } from "react";
import { observer } from "mobx-react";
import { FormContext, SubmitSuccessComponent } from "..";

const DefaultSubmitSuccessMessage: SubmitSuccessComponent = props => (
    <div style={{ color: "green" }}>{
        typeof props.result === "string"
            ? props.result
            : JSON.stringify(props.children)
    }</div>
);

export const SubmitSuccessMessage: React.FC<{ component?: SubmitSuccessComponent }> = observer((props) => {
    const context = useContext(FormContext);
    const submitResult = context.submitMessage;
    const Component = props.component || DefaultSubmitSuccessMessage;

    return (
        <>{
            submitResult
                ? <Component result={submitResult}/>
                : null
        }</>
    );
});