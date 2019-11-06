import React, { useContext } from "react";
import { observer } from "mobx-react";
import { FormContext } from "..";

export const Initializing: React.FC = observer(props => {
    const context = useContext(FormContext);
    return <>{context.initializing ? props.children : null}</>;
});