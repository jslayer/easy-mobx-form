import React from "react";
import isEqual from "lodash/isEqual";
import { AvailabilityCallback, FormContext, FormStore } from "..";
import { SubmitCallback, ValidateCallback } from "..";

export const Form: React.FC<{
    store: FormStore<any>;
    initialValues: object | Promise<any>;
    submit: SubmitCallback<any, any>;
    validate?: ValidateCallback<any>;
    availability?: AvailabilityCallback<any>;
    forceValidation?: boolean;
    forceAvailability?: boolean;
}> = (props) => {
    const store = props.store;

    const initialValues = props.initialValues;

    if (props.validate) {
        store.setupValidation(props.validate);
    }

    if (!isEqual(initialValues, store.initialValues)) {
        store.initialize(
            props.initialValues,
            props.forceValidation ? () => store.validate() : null,
        );
    }

    if (props.submit) {
        store.setupSubmit(props.submit);
    }

    if (props.availability) {
        store.setupAvailability(props.availability);

        if (props.forceAvailability) {
            store.handleAvailability();
        }
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