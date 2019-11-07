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
    name: string;
};

export type FieldRenderer<D = object | undefined> = React.FC<
    FieldProps & {
        onChange: (value: any) => void;
        forceError?: boolean;
        initializing: boolean;
        data?: D;
    }
>;

export type BaseFieldComponent = React.FC<{
    name: string;
    component: FieldRenderer;
    validate?: FieldValidator;
    errorIfPristine?: boolean;
    data?: object;
}>;

export type SubmitSuccessResult<R = undefined> = string | object | R;
export type SubmitErrorResult<R = undefined> = string | object | R;

export type SubmitSuccessComponent<R = undefined> = React.FC<{ result: SubmitSuccessResult<R> }>;

export type SubmitErrorComponent<R = undefined> = React.FC<{ result: SubmitErrorResult<R> }>;

export type SubmitCallback<V = object, R = undefined> = (
    values: V,
    initialValues?: V,
) => Promise<SubmitSuccessResult<R>>;

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
