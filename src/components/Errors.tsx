import { observer } from "mobx-react";
import React, { useContext } from "react";
import { FormContext } from "..";

const DefaultErrorsWrapper: React.FC = props => (
    <ul>{props.children}</ul>
);

const DefaultErrorItem: React.FC<{ name: string; message: string }> = props => (
    <li>{props.name}: {props.message}</li>
);

export const Errors: React.FC<{
    wrapperComponent?: React.FC;
    itemComponent?: React.FC<{ name: string; message: string }>
}> = observer(props => {
    const context = useContext(FormContext);
    const errors = context.errors as {[keys: string]: string};
    const Wrapper = props.wrapperComponent || DefaultErrorsWrapper;
    const Item = props.itemComponent || DefaultErrorItem;

    return !context.valid && errors ? (
        <Wrapper>
            {Object.keys(errors).map((name, key) => (
                <Item key={key} name={name} message={errors[name]}/>
            ))}
        </Wrapper>
    ) : null;
});