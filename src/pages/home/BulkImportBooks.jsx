import React from "react";
import { useFetchBulkBooksQuery } from "../../redux/features/books/booksApi";
import BookCardV1 from "../books/BookCardv1";

const BulkImportBooks = () => {
  const { data: books = [] } = useFetchBulkBooksQuery();

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Books Imported from File</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {books.length > 0 &&
          books.map((book, index) => <BookCardV1 key={book._id || index} book={book} />)}
      </div>
    </div>
  );
};

export default BulkImportBooks;