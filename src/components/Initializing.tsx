import React, { useContext } from "react";
import { observer } from "mobx-react";
import { FormContext } from "..";

const DefaultInitializing: React.FC = props => (
    <div style={{ color: "blue" }}>{props.children}</div>
);

export const Initializing: React.FC<{ component?: React.FC }> = observer(props => {
    const context = useContext(FormContext);
    const initializing = context.initializing;
    const Component = props.component || DefaultInitializing;

    return (
        <>
            {initializing ? (
                <Component>{props.children}</Component>
            ) : null}
        </>
    );
});