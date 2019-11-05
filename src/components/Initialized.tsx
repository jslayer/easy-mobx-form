import React, { useContext } from "react";
import { observer } from "mobx-react";
import { FormContext } from "..";

export const Initialized: React.FC = observer(props => {
    const context = useContext(FormContext);
    return context.initializing ? null : <>props.children</>;
});