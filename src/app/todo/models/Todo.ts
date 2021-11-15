export class Todo {
    category: string;
    description: string;
    done: boolean;
    id?: number;
    label: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
