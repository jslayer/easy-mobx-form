import React from "react";
import { FormStore } from "./FormStore";

export const FormContext = React.createContext<FormStore<object>>(null);