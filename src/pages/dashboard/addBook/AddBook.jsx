import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import {
  useAddBookMutation,
  useBulkImportBooksMutation,
} from "../../../redux/features/books/booksApi";
import Swal from "sweetalert2";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firebase.config"; // Adjust the path based on your file structure
import * as XLSX from "xlsx"; // Add this library

const AddBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [addBook, { isLoading }] = useAddBookMutation();
  const [imageFileName, setImageFileName] = useState("");

   const [selectedFile, setSelectedFile] = useState(null);

  const handleBulkFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file
    if (file) {
      setSelectedFile(file); // Store the file in state
    } else {
      setSelectedFile(null); // Reset if no file is selected
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `books/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };


const handleBulkImport = async () => {
    if (!selectedFile) {
      Swal.fire("Error", "Please select a file first.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    // Log FormData entries
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch("http://localhost:5000/api/books/bulk-import", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire("Success", "Books imported successfully!", "success");
        console.log("Imported books:", data);
      } else {
        throw new Error("Failed to import books");
      }
    } catch (error) {
      console.error("Bulk import failed:", error);
      Swal.fire("Error", "Failed to import books. Try again.", "error");
    }
  };

  const onSubmit = async (data) => {
    try {
      let coverImageUrl = "";
      if (imageFile) {
        coverImageUrl = await uploadImage(imageFile);
      }
      const newBookData = {
        ...data,
        coverImage: coverImageUrl,
      };
      await addBook(newBookData).unwrap();
      Swal.fire("Success", "Book added successfully!", "success");
      reset();
      setImageFileName("");
      setImageFile(null);
    } catch (error) {
      Swal.fire("Error", "Failed to add book. Try again.", "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      {/* Form for adding single book */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technology" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
          ]}
          register={register}
        />
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>

      {/* Bulk Import Section */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Bulk Import Books
        </h3>
        <input
          type="file"
          accept=".xlsx, .csv"
          className="mb-2 w-full"
            onChange={handleBulkFileChange}
        />
        <button
          onClick={handleBulkImport}
          className="w-full py-2 bg-rose-500 text-white font-bold rounded-md"
        >
          Bulk Upload
        </button>
      </div>
    </div>
  );
};

export default AddBook;
