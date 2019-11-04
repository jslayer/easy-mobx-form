import React, { useContext } from "react";
import { observer } from "mobx-react";
import { FormContext } from "../domain/FormContext";

export const Reset: React.FC<{
    className?: string;
}> = observer((props) => {
    const context = useContext(FormContext);
    const onClick = () => {
        context.reset();
    };

    return (
        <button
            type="button"
            className={props.className}
            onClick={onClick}
            disabled={context.pristine || context.initializing}
        >{props.children}</button>
    );
});