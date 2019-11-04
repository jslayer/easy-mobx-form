import React, { useContext } from "react";
import { FormContext } from "..";
import { observer } from "mobx-react";

const DefaultValidating: React.FC = (props) => (
    <div style={{ color: "blue" }}>{props.children}</div>
);

export const Validating: React.FC<{ component?: React.FC }> = observer(props => {
    const context = useContext(FormContext);
    const validating = context.validating;
    const Component = props.component || DefaultValidating;

    return (
        <>
            {validating ? (
                <Component>{props.children}</Component>
            ) : null}
        </>
    );
});