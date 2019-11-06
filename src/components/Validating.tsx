import React, { useContext } from "react";
import { FormContext } from "..";
import { observer } from "mobx-react";

export const Validating: React.FC = observer(props => {
    const context = useContext(FormContext);
    return <>{context.validating ? props.children : null}</>;
});