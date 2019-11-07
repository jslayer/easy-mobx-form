import { SubmitErrorResult } from "..";

export class SubmitError<R = string | object> {
    message = null as SubmitErrorResult<R>;

    constructor(message: SubmitErrorResult<R>) {
        this.message = message;
    }
}
