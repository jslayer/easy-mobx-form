import React, { useContext } from "react";
import { observer } from "mobx-react";
import { FormContext } from "..";

const DefaultSubmitSuccessMessage: React.FC = props => (
    <div style={{ color: "green" }}>{props.children}</div>
);

export const SubmitSuccessMessage: React.FC<{ component?: React.FC }> = observer((props) => {
    const context = useContext(FormContext);
    const submitMessage = context.submitMessage;
    const Component = props.component || DefaultSubmitSuccessMessage;

    return (
        <>{
            submitMessage ? (
                <Component>{submitMessage}</Component>
            ) : null
        }</>
    );
});