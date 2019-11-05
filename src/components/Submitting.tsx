import React, { useContext } from "react";
import { FormContext } from "..";
import { observer } from "mobx-react";

const DefaultSubmitting: React.FC = props => (
    <div style={{ color: "blue" }}>Submitting</div>
);

export const Submitting: React.FC<{ component?: React.FC }> = observer(props => {
    const context = useContext(FormContext);
    const Component = props.component || DefaultSubmitting;

    return (
        <>{
            context.submitting ? <Component/> : null
        }</>
    );
});