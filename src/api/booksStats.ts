import { request } from "./instance";

export class BooksStats{
    static getAllBooks(){
        return request({
          method: 'GET',
          url: 'books/bulk',
        });
    }
}