import { request } from './instance';

export class BooksStats {
  static getAllBooks() {
    return request({
      method: 'GET',
      url: 'books/bulk',
    });
  }

  static getAuthors() {
    return request({
      method: 'GET',
      url: 'books/authors',
    });
  }

  static getPublishers() {
    return request({
      method: 'GET',
      url: 'books/publishers',
    });
  }
}
