# easy-mobx-form

Easy form building library based on mobx-react

## Installing

```
    yarn add easy-modx-form
```

or

```
    npm install easy-modx-form
```

## Components

### Form

Main form component. Setups contexts for the inner elements (such as inputs, buttons and other components).

parameters:

- store ([FormStore](#formstore)) - form store instance
- initialValues - object with initial values or Promise which will resolve such object
- submit ([SubmitCallback](#submitcallback)) - submit callback
- validate? ([ValidateCallback](#validatecallback)) - validate callback
- availability? ([AvailabilityCallback](#availabilitycallback)) - availability callback. Returns the list of fields which should be disabled
- forceValidation? (boolean = false) - force validation right after initializing form

Form validation works along with per-field validation but have higher priority. Form validation could be asynchronous.

#### Form examples

```tsx
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
- validate ([FieldValidator](#fieldvalidator)) - synchronous field validation function
- errorIfPristine? (boolean = false) - whether display or not display field error when current values is pristine

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

parameters:

- name (string) - name of the form element
- component: [FieldRenderer](#fieldrenderer);
- validate? ([FieldValidator](#fieldvalidator)) - synchronous field validation function
- errorIfPristine? (boolean = false) - whether display or not display field error when current values is pristine. Default is `false`
- data? (object) - `object` which will be passed into field renderer component

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

Submit button

parameters:

- type ("button" | "submit") - type of the button
- name? (string) - name of the field. will be used for saving button value on submit
- value? (string) - if name is set, than this value will be saved in form values on click
- className? (string) - className for the `button` element

```tsx
import React from "react";
import { Form, Submit } from "eazy-modx-form";

const App: React.FC = () => (
    <Form store={form}>
        <Submit name="submit" value="update" className="btn btn-default">Update</Submit>
        <Submit name="submit" value="delete" className="btn btn-danger">Delete</Submit>
    </Form>
);
```

### Reset

Reset button. Restore form values to the initial

parameters:

- className? (string)

```tsx
import React from "react";
import { Form, Reset } from "eazy-modx-form";

const App: React.FC = () => (
    <Form store={form}>
        <Reset className="btn btn-default">Reset</Submit>
    </Form>
);
```

### Errors

Component for rendering the list of validation errors

parameters:

- wrapperComponent? (React.FC) - component which should be rendered around the items
- itemComponent? (React.FC<{ name: string; message: string }>) - component for decorating error message

```tsx
import React from "react";
import { Form, Errors } from "eazy-modx-form";

const App: React.FC = () => (
    <Form store={form}>
        <Errors />
    </Form>
);
```

By default will renders simple list of errors:

```html
<ul>
    <li>fieldName1: Error message 1</li>
    <li>fieldName2: Error message 2</li>
</ul>
```

### Initialized

Wrapper component which children will be rendered only when form is initialized.
Opposite to [Initializing](#initializing)

```typescript jsx
import React from "react";
import { Form, Initialized } from "eazy-modx-form";

const App: React.FC = () => (
    <Form store={form}>
        <Initialized>
            some form components
        </Initialized>
    </Form>
);
``` 

### Initializing

Wrapper component which children will be rendered when form is initializing (i.e. loading data).
Opposite to [Initialized](#initialized)

```tsx
import React from "react";
import { Form, Initializing } from "eazy-modx-form";

const App: React.FC = () => (
    <Form store={form}>
        <Initializing>
            <SomeLoaderComponent />
        </Initializing>
    </Form>
);
```

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

