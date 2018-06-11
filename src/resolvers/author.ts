import { Query, Resolver, ResolveProperty, Mutation } from '@nestjs/graphql';

const books = [
  {
    id: 1,
    title: 'one',
    author: null,
  },
  {
    id: 2,
    title: 'two',
    author: null,
  },
];

let authors = [
  {
    id: 1,
    name: 'name 1',
    age: 22,
  },
  {
    id: 2,
    name: 'name 2',
    age: 34,
  },
];

let lastId = 2;

@Resolver('Author')
export class AuthorResolver {

  @Query('authors')
  async getAuthors(obj, args, context, info) {
    return authors.map(author => ({
      ...author,
      books: books.filter(book => book.author === author.id),
    }));
  }

  @Mutation()
  addAuthor(_, { name, age }) {
    const newAuthor = {
      name,
      age,
      id: ++lastId,
    };
    authors = authors.concat(newAuthor);
    return newAuthor;
  }

  @ResolveProperty('books')
  async getBooks(author, args, context, info) {
    return [books[0]];
  }
}
