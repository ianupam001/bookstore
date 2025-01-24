import React from "react"
import { FiShoppingCart, FiBook, FiCalendar, FiGlobe, FiHash } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCart } from "../../redux/features/cart/cartSlice"

const BookCardV1 = ({ book }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <Link to={`/books/${book._id}`}>
          <img
            src={book?.imageLinks[0] || "/placeholder.svg"}
            alt={book?.title}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className="p-4">
        <Link to={`/books/${book._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 truncate">{book?.title}</h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2 truncate">{book?.authors.join(", ")}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FiBook className="mr-1" />
          <span className="truncate">{book?.categories.join(", ")}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FiCalendar className="mr-1" />
          <span>{new Date(book?.releaseDate).getFullYear()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FiGlobe className="mr-1" />
          <span>{book?.language}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FiHash className="mr-1" />
          <span>{book?.pages} pages</span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <div>
            <span className="font-medium text-lg text-gray-800">${book?.sellingPrice}</span>
            {book?.price && book?.price !== book?.sellingPrice && (
              <span className="line-through text-sm text-gray-500 ml-2">${book?.price}</span>
            )}
          </div>
          <button
            onClick={() => handleAddToCart(book)}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
            aria-label="Add to Cart"
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCardV1

