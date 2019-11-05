import * as React from "react";
import { shallow } from "enzyme";
import { Form } from "../Form";
import { createFormStore, FormStore } from "../..";

type FormType = {
    name: string;
};

let form: FormStore<FormType>;

beforeEach(() => {
    form = createFormStore<FormType>();
});

describe("<Form />", () => {
    it("renders Form component", () => {
        const wrapper = shallow(
            <Form
                use={form}
                submit={() => void(0)}
                initialValues={{ name: "John" }}
            />,
        );
        expect(wrapper.find("form").length).toEqual(1);
    });
});