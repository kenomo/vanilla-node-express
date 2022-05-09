import ExampleConfigJSON from "./example.config.json"

interface IExample {
    A: string,
    B: string
}

interface IExamples {
    ABC: IExample[]
}

export const Config: IExamples = ExampleConfigJSON;
export default Config;