# easy-mobx-form

Easy form building library based on mobx-react

## Components

### Form

parameters:

- store ([FormStore]()) - form store instance. Required.
- initialValues - object with initial values or Promise which will resolve such object. Required
- submit ([SubmitCallback]()) - submit callback. Required.
- validate ([ValidateCallback]()) - validate callback. Optional.
- availability ([AvailabilityCallback]()) - availability callback. Returns the list of fields which should be disabled. Optional.
- forceValidation - force validation right after initializing form. Optional. Default: `false`

#### Form examples

#### 1.

```typescript jsx
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

### FieldCheck

### Field

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

