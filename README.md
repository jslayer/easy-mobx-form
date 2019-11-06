# easy-mobx-form

Easy form building library based on mobx-react

## Installing

```shell script
    yarn add easy-modx-form
```

or

```shell script
    npm install easy-modx-form
```

## Components

### Form

Main form component. Setups contexts for the inner elements (such as inputs, buttons and other components).

parameters:

- store ([FormStore](#formstore)) - form store instance. Required.
- initialValues - object with initial values or Promise which will resolve such object. Required
- submit ([SubmitCallback](#submitcallback)) - submit callback. Required.
- validate ([ValidateCallback](#validatecallback)) - validate callback. Optional.
- availability ([AvailabilityCallback](#availabilitycallback)) - availability callback. Returns the list of fields which should be disabled. Optional.
- forceValidation - force validation right after initializing form. Optional. Default: `false`

Form validation works along with per-field validation but have higher priority. Form validation could be asynchronous.

#### Form examples

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Form, createFormStore, Submit, FieldText } from "eazy-modx-form";

const form = createFormStore();

const App: React.FC = () => (
    <Form
        store={form}
        initialValues={initializationFn}
        submit={submitFn}
        validate={validationFn}
    >
        <FieldText name="name" />
        <Submit>Submit</Submit>
    </Form>
);

ReactDOM.render(
    App,
    document.getElementById("external-module-root")
)
```

### FieldText

Basic text field component.

parameters:

- name (string) - name of the form element
- validate ([FieldValidator](#fieldvalidator)) - synchronous field validation function. Optional
- errorIfPristine (boolean) - whether display or not display field error when current values is pristine

```html
...
<Form store={form}>
    ...
    <FormText
        name="name"
    />
    ...
</Form>
...
```

### FieldCheck

Basic checkbox field component.

parameters: Same as [FieldText](#fieldtext)

### Field

General component for build your own custom field components

parameters Same as [FieldText](#fieldtext) plus:

- component: [FieldRenderer](#fieldrenderer);
- data: optional `object` which will be passed into field renderer component

#### Example (Twitter Bootstrap based form element)

```tsx
import React from "react";
import { Field } from "easy-mobx-form";

type TBTextFieldData = {
    placeholder?: string;
};

const TBTextFieldRenderer: FieldRenderer<TBTextFieldData> = (props) => {
    const {
        value,
        error,
        onChange,
        disabled,
        pristine,
        forceError,
        initializing,
        name,
    } = props;
    
    const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };

    return (
        <>
            <input
                type="text"
                name={name}
                onChange={handleChange}
                className="form-control"
                value={value || ""}
                disabled={disabled || initializing}
            />
            {
                error && (forceError || !pristine) 
                    ? <small class="form-text text-muted">{error}</small> 
                    : null
            }
        </>
    );
}

export const TBTextField: React.FC<BaseFieldComponent & {
    data?: TBTextFieldData;
    // custom properties
    label: string;
}> = (props) => {
    return (
        <div class="form-group">
            <label>{props.label}</label>
            <Field
                component={TBTextFieldRenderer}
                name={props.name}
                validate={props.validate}
                errorIfPristine={props.errorIfPristine}
                data={props.data}
            />
        </div>
    );
};
```

### Submit

### Reset

### Errors

### Initialized

### Initializing

### Submitting

### SubmitSuccessMessage

### SubmitErrorMessage

### Validating

### Values

### Interfaces

#### FormStore

#### SubmitCallback

#### ValidateCallback

#### AvailabilityCallback

#### FieldValidator

#### FieldRenderer

