import * as casual from 'casual';
import { MockList } from 'graphql-tools';

export default {
    Int: () => casual.integer(0, 100),
    Author: () => ({
        id: () => casual.uuid,
        name: () => casual.first_name,
        books: () => new MockList([0, 5])
    }),
    Book: () => ({
        id: () => casual.uuid,
        title: () => casual.title,
    })
}