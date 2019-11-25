import { action, observable } from "mobx";
import isEqual from "lodash/isEqual";
import {
    AvailabilityCallback,
    FieldProps,
    FieldValidator,
    Initializer,
    PossibleErrors,
    SubmitCallback,
    ValidateCallback,
} from "..";
import { SubmitError } from "./SubmitError";

export class FormStore<V> {
    @observable
    public submitting = false;

    @observable
    public validating = false;

    @observable
    public initializing = false;

    @observable
    public initializingError = null as Error;

    @observable
    public submitResult = null as object | string;

    @observable
    public submitError = null as object | string;

    @observable
    public errors = null as PossibleErrors<V>;

    @observable
    public disabledFields = null as boolean | { [key in keyof V]?: boolean };

    @observable
    valid = false;

    @observable
    public pristine = false;

    @observable
    public values = {} as V;

    @observable
    public initialValues = null as V;

    private validators = {} as { [key in keyof V]?: FieldValidator };

    private submitCallback = null as SubmitCallback<V>;

    private validateCallback = null as ValidateCallback<V>;

    private availabilityCallback = null as AvailabilityCallback<V>;

    @action
    public initialize(initializer: Initializer<V>, initializeCallback?: () => void) {
        this.pristine = true;
        this.validators = {};
        this.submitResult = null;

        if (initializer instanceof Promise) {
            this.initializing = true;
            initializer
                .then(result => {
                    this.initializing = false;
                    this.initialValues = result;
                    this.values = result;
                    initializeCallback();
                })
                .catch((error: Error) => {
                    this.initializing = false;
                    this.initializingError = error;
                });
        } else {
            this.initialValues = initializer;
            this.values = initializer;
            if (typeof initializeCallback === "function") {
                initializeCallback();
            }
        }
        return this;
    }

    @action
    public async validate() {
        this.validating = true;
        const validation = this.validateCallback ? this.validateCallback(this.values, this.initialValues) : null;

        const mainErrors: PossibleErrors<V> =
            validation instanceof Promise ? await validation : validation ? validation : {};

        const localErrors: PossibleErrors<V> = {};

        if (this.validators) {
            const names = Object.keys(this.validators) as (keyof V)[];

            names.map(key => {
                const error = this.validators[key](
                    this.values[key],
                    key,
                    this.initialValues && this.initialValues[key],
                    this.values,
                    this.initialValues,
                );

                if (error) {
                    localErrors[key] = error;
                }
            });
        }

        this.valid = !Object.keys(mainErrors || {}).length && !Object.keys(localErrors || {}).length;

        this.errors = this.valid
            ? null
            : {
                  ...(localErrors || {}),
                  ...(mainErrors || {}),
              };

        this.validating = false;
    }

    @action
    public submit() {
        if (this.valid && this.submitCallback) {
            this.submitting = true;
            this.submitResult = null;
            this.submitError = null;

            const submitResult = this.submitCallback(this.values, this.initialValues);

            if (submitResult instanceof Promise) {
                submitResult
                    .then(result => {
                        if (this.submitting) {
                            this.submitting = false;
                            this.submitResult = result;
                        }
                    })
                    .catch((error: SubmitError) => {
                        if (this.submitting) {
                            this.submitting = false;
                            this.submitError = error.message;
                        }
                    });
            } else {
                this.submitting = false;
                this.submitResult = submitResult;
            }
        }
    }

    @action
    public setupSubmit(submitCallback: SubmitCallback<V>) {
        this.submitCallback = submitCallback;
        return this;
    }

    @action
    public setupValidation(validateCallback: ValidateCallback<V>) {
        this.validateCallback = validateCallback;
        return this;
    }

    @action
    public setupAvailability(availabilityCallback: AvailabilityCallback<V>) {
        this.availabilityCallback = availabilityCallback;
        return this;
    }

    @action
    public setupFieldValidator(name: string, validator: FieldValidator) {
        this.validators[name as keyof V] = validator;
        return this;
    }

    @action
    public handleChange = (name: string) => (value: any) => {
        if (!this.submitting && !this.validating) {
            this.values[name as keyof V] = value;
            this.pristine = isEqual(this.values, this.initialValues);

            this.validate();
            this.handleAvailability();
        }
    };

    @action handleAvailability = () => {
        if (this.availabilityCallback) {
            this.disabledFields = this.availabilityCallback(this.values, this.initialValues);
        }
    };

    @action
    public reset() {
        this.resetValues();
        this.pristine = true;
        this.submitting = false;
        this.submitResult = null;
        return this;
    }

    public getField(name: string): FieldProps {
        const tName = name as keyof V;
        const value = this.values[tName];
        const initialValue = this.initialValues && this.initialValues[tName];

        const pristine = isEqual(value, initialValue);
        const touched = !pristine;

        const valid = this.errors ? !this.errors[tName] : true;
        const error = this.errors ? this.errors[tName] : null;

        const disabled =
            this.disabledFields !== null &&
            this.disabledFields !== true &&
            (this.disabledFields === false || this.disabledFields[tName]);

        return {
            pristine,
            value,
            initialValue,
            touched,
            valid,
            error,
            disabled,
            name,
            values: this.values,
        };
    }

    private resetValues() {
        this.values = Object.keys(this.initialValues || {}).reduce((collect, key) => {
            // @ts-ignore
            collect[key] = this.initialValues[key];
            return collect;
        }, {}) as V;
    }
}

export function createFormStore<V>() {
    return new FormStore<V>();
}
