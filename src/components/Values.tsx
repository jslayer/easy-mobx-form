import React, { ReactElement, useContext } from "react";
import { observer } from "mobx-react";
import { FormContext } from "..";

type ValuesProps = {
    children?(values: any): ReactElement<any>;
    render?(values: any): ReactElement<any>
};

export const Values: React.FC<ValuesProps> = observer(({ children, render }) => {
    const component = render || children;

    if (typeof component !== "function") {
        return null;
    }

    const context = useContext(FormContext);

    return component(context.values);
});