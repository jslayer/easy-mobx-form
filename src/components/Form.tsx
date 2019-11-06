import React from "react";
import isEqual from "lodash/isEqual";
import { AvailabilityCallback, FormContext, FormStore } from "..";
import { SubmitCallback, ValidateCallback } from "..";

export const Form: React.FC<{
    store: FormStore<any>;
    initialValues: object | Promise<any>;
    submit: SubmitCallback<any>;
    validate?: ValidateCallback<any>;
    availability?: AvailabilityCallback<any>;
    forceValidation?: boolean;
}> = (props) => {
    const store = props.store;

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

    if (props.availability) {
        store.setupAvailability(props.availability);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        store.submit();
    };

    return (
        <FormContext.Provider value={props.store}>
            <form onSubmit={onSubmit}>
                {props.children}
            </form>
        </FormContext.Provider>
    );
};