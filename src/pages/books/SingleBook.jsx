import React, {useEffect} from "react"
import { useParams } from "react-router-dom"
import { useFetchSingleBookQuery } from "../../redux/features/books/booksApi"
import {
  FiBook,
  FiCalendar,
  FiGlobe,
  FiHash,
  FiDollarSign,
  FiShoppingCart,
  FiAward,
  FiBox,
  FiBookOpen,
  FiUser,
} from "react-icons/fi"

const BookDetailPage = () => {
  const { id: bookId } = useParams()
 useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const { data: book, isLoading, isError, error } = useFetchSingleBookQuery(bookId)

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (isError) {
    return <div className="text-red-600 text-center py-8">Error fetching book details: {error.message}</div>
  }

  if (!book) {
    return <div className="text-gray-600 text-center py-8">Book not found.</div>
  }

  const handleAddToCart = (book) => {
    // Implement add to cart functionality
    console.log("Adding to cart:", book)
  }

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto mt-20 ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{book.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <img
            src={book.imageLinks[0] || "/placeholder.svg"}
            alt={book.title}
            className="w-full h-auto rounded-lg shadow-lg mb-4"
          />
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-gray-800">${book.sellingPrice}</span>
              {book.price !== book.sellingPrice && <span className="line-through text-gray-500">${book.price}</span>}
            </div>
            <button
              onClick={() => handleAddToCart(book)}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            >
              <FiShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <InfoItem icon={<FiUser />} label="Authors" value={book.authors.join(", ")} />
            <InfoItem icon={<FiBook />} label="Categories" value={book.categories.join(", ")} />
            <InfoItem icon={<FiHash />} label="Pages" value={book.pages} />
            <InfoItem icon={<FiGlobe />} label="Language" value={book.language} />
            <InfoItem icon={<FiCalendar />} label="Published" value={new Date(book.releaseDate).toLocaleDateString()} />
            <InfoItem icon={<FiAward />} label="Publisher" value={book.publisher} />
            <InfoItem icon={<FiBox />} label="ISBN" value={book.ISBN} />
            <InfoItem icon={<FiBookOpen />} label="Format" value={book.format} />
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About the Book</h2>
            <p className="text-gray-700">{book.aboutTheBook}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About the Author</h2>
            <p className="text-gray-700">{book.aboutTheAuthor}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem icon={<FiBox />} label="Weight" value={book.weight} />
              <InfoItem icon={<FiBox />} label="Dimensions" value={book.dimensions} />
              <InfoItem icon={<FiHash />} label="ISBN10/ASIN/SKU" value={book.ISBN10_ASIN_SKU} />
              <InfoItem icon={<FiAward />} label="Series" value={book.seriesName || "N/A"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="text-blue-600 mr-2">{icon}</div>
    <div>
      <span className="text-sm text-gray-500">{label}</span>
      <p className="text-gray-800">{value}</p>
    </div>
  </div>
)

export default BookDetailPage

