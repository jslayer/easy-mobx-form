import { action, observable } from "mobx";
import isEqual from "lodash/isEqual";
import { SubmitError } from './SubmitError';

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
  public submitMessage = null as string | object;

  @observable
  public submitError = null as string;

  @observable
  public errors = null as object;

  @observable
  public disabledFields = null as { [key: string]: boolean };

  @observable
  valid = false;

  @observable
  public pristine = false;

  @observable
  public values = {} as object;

  @observable
  public initialValues = {} as object;

  private validators = {} as { [key: string]: FieldValidator };

  private submitCallback = null as SubmitCallback;

  private validateCallback = null as ValidateCallback;

  private availabilityCallback = null;

  @action
  public initialize(initializer: Initializer, initializeCallback?: () => void) {
    this.pristine = true;
    this.validators = {};
    this.submitMessage = null;

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
      initializeCallback();
    }
    return this;
  }

  @action
  public validate() {
    this.validating = true;
    const validationPromise = this.validateCallback
      ? this.validateCallback(this.values, this.initialValues)
      : new Promise(rs => rs(null));

    validationPromise
      .then((validationResult: object | null) => {
        const mainErrors = validationResult;
        const localErrors = {};

        if (this.validators) {
          const names = Object.keys(this.validators);

          names.map(key => {
            const error = this.validators[key](this.values[key], key, this.initialValues[key], this.values, this.initialValues);

            if (error) {
              localErrors[key] = error;
            }
          });
        }

        this.valid = !Object.keys(mainErrors || {}).length && !Object.keys(localErrors || {}).length;

        this.errors = this.valid ? null : {
          ...localErrors || {},
          ...mainErrors || {},
        };

        this.validating = false;
      });
  }

  @action
  public submit() {
    if (this.valid && this.submitCallback) {
      this.submitting = true;
      this.submitMessage = null;
      this.submitError = null;
      try {
        this.submitCallback(this.values, this.initialValues)
          .then((result) => {
            if (this.submitting) {
              this.submitting = false;
              this.submitMessage = result;
            }
          })
          .catch((error: SubmitError) => {
            if (this.submitting) {
              this.submitting = false;
              this.submitError = error.message;
            }
          });
      } catch (e) {
        this.submitting = false;
        this.submitError = e.message;
      }
    }
  }

  @action
  public setupSubmit(submitCallback) {
    this.submitCallback = submitCallback;
    return this;
  }

  @action
  public setupValidation(validateCallback) {
    this.validateCallback = validateCallback;
    return this;
  }

  @action
  public setupAvailability(availabilityCallback) {
    this.availabilityCallback = availabilityCallback;
    return this;
  }

  @action
  public setupFieldValidator(name, validator: FieldValidator) {
    this.validators[name] = validator;
    return this;
  }

  @action
  public handleChange = (name) => (value) => {
    if (!this.submitting && !this.validating) {
      this.values[name] = value;
      this.pristine = isEqual(this.values, this.initialValues);

      this.validate();

      if (this.availabilityCallback) {
        this.disabledFields = this.availabilityCallback(this.values, this.initialValues);
      }
    }
  };

  @action
  public reset() {
    this.resetValues();
    this.pristine = true;
    this.submitting = false;
    this.submitMessage = null;
    return this;
  }

  public getField(name): FieldProps {
    const value = this.values[name];
    const initialValue = this.initialValues[name];

    const pristine = isEqual(value, initialValue);
    const touched = !pristine;

    const valid = this.errors ? !this.errors[name] : true;
    const error = this.errors ? this.errors[name] : null;

    const disabled = this.disabledFields && this.disabledFields[name];

    return {
      pristine,
      value,
      initialValue,
      touched,
      valid,
      error,
      disabled,
      values: this.values,
    };
  }

  private resetValues() {
    this.values = Object.keys(this.initialValues).reduce((collect, key) => {
      collect[key] = this.initialValues[key];
      return collect;
    }, {});
  }
}
