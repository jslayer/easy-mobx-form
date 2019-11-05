import React from "react";
import isEqual from "lodash/isEqual";
import { FormContext, FormStore } from "..";
import { SubmitCallback, ValidateCallback } from "../types/types";

export const Form: React.FC<{
    use: FormStore<any>;
    initialValues: object | Promise<any>;
    submit: SubmitCallback<any>;
    validate?: ValidateCallback<any>;
    forceValidation?: boolean;
}> = (props) => {
    const store = props.use;

    if (!isEqual(props.initialValues, store.initialValues)) {
        store.initialize(
            props.initialValues,
            props.forceValidation ? () => store.validate() : null,
        );
    }

    if (props.validate) {
        store.setupValidation(props.validate);
    }

    if (props.submit) {
        store.setupSubmit(props.submit);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        store.submit();
    };

    return (
        <FormContext.Provider value={props.use}>
            <form onSubmit={onSubmit}>
                {props.children}
            </form>
        </FormContext.Provider>
    );
};