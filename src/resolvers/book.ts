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

const authors = [
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

@Resolver('Book')
export class AuthorResolver {

  @Query('books')
  async getBook(obj, args, context, info) {
    return books.map(book => ({
      ...book,
      author: authors.find(author => book.author === author.id),
    }));
  }

  @ResolveProperty('author')
  async getBooks(author, args, context, info) {
    return [authors[0]];
  }
}