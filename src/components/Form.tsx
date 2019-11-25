import React from "react";
import isEqual from "lodash/isEqual";
import { AvailabilityCallback, FormContext, FormStore } from "..";
import { SubmitCallback, ValidateCallback } from "..";

type Initializer =  object | Promise<object>;

const getInitialValues = (initializer: Initializer): Promise<object> => (
    new Promise(rs => {
        if (initializer instanceof Promise) {
            initializer.then(data => rs(data));
        } else {
            rs(initializer);
        }
    })
);

export const Form: React.FC<{
    store: FormStore<any>;
    initialValues: Initializer;
    submit: SubmitCallback<any, any>;
    validate?: ValidateCallback<any>;
    availability?: AvailabilityCallback<any>;
    forceValidation?: boolean;
    forceAvailability?: boolean;
}> = (props) => {
    const store = props.store;

    if (props.validate) {
        store.setupValidation(props.validate);
    }

    if (props.availability) {
        store.setupAvailability(props.availability);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        store.submit();
    };

    getInitialValues(props.initialValues)
        .then(initialValues => {
            if (!isEqual(initialValues, store.initialValues)) {
                store.initialize(
                    initialValues,
                    () => {
                        if (props.forceValidation) {
                            store.validate();
                        }
                    }
                );
            } else {
                if (props.forceValidation) {
                    store.validate();
                }
            }

            if (props.forceAvailability) {
                store.handleAvailability();
            }

            if (props.submit) {
                store.setupSubmit(props.submit);
            }
        });

    return (
        <FormContext.Provider value={props.store}>
            <form onSubmit={onSubmit}>
                {props.children}
            </form>
        </FormContext.Provider>
    );
};