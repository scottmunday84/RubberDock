import {v4 as uuid} from "uuid";

export const getChildren = (initialChildren) => {
    let children = initialChildren instanceof Array ? initialChildren : [initialChildren];

    return children.map(item => ({
        item,
        id: uuid()
    }));
};
