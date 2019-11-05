import React from "react";

export type FieldProps<V = object> = {
    pristine: boolean;
    value: any;
    initialValue: any;
    touched: boolean;
    valid: boolean;
    error: null | string;
    values: any;
    disabled: boolean;
};

export type FieldComponent = React.FC<
    FieldProps & {
        onChange: (value: any) => void;
        forceError?: boolean;
        initializing: boolean;
    }
>;

export type SubmitCallback<V = object> = (values: V, initialValues?: V) => Promise<string | object>;

export type ValidateCallback<V = object> = (values: V, initialValues?: V) => Promise<object>;

export type AvailabilityCallback<V = object> = (values: V, initialValues?: V) => { [key in keyof V]?: boolean };

export type Initializer<V = object> = V | Promise<V>;

export type FieldValidator = <V>(
    value: any,
    name?: keyof V,
    initialValue?: any,
    values?: V,
    initialValues?: V,
) => string | void | null;

export type PossibleErrors<V> = { [key in keyof V]?: string };
