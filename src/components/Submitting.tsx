import React, { useContext } from "react";
import { FormContext } from "..";
import { observer } from "mobx-react";

export const Submitting: React.FC = observer(props => {
    const context = useContext(FormContext);

    return <>{context.submitting ? props.children : null}</>;
});