import { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

import { BooksStats } from 'src/api/booksStats';

export function BulkExportView(): JSX.Element {
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>('');

  const fetchBooks = async () => {
    try {
      const response = await BooksStats.getAllBooks();
      if (response?.data) {
        setBooks(response.data);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleExport = () => {
    if (books.length === 0) {
      toast.error('No books data available to export.');
      return;
    }

    const formattedData = books.map((book) => ({
      ISBN: book.ISBN,
      Format: book.format,
      Title: book.title,
      Authors: book.authors?.join(', '),
      Categories: book.categories?.join(', '),
      Publisher: book.publisher,
      Language: book.language,
      Pages: book.pages,
      ISBN10_ASIN_SKU: book.ISBN10_ASIN_SKU,
      ReleaseDate: book.releaseDate ? new Date(book.releaseDate).toLocaleDateString() : '',
      Weight: book.weight,
      Dimensions: book.dimensions,
      Reviews: book.reviews,
      SeriesName: book.seriesName,
      CurrencyName: book.currencyName,
      Price: book.price,
      SellingPrice: book.sellingPrice,
      AboutTheBook: book.aboutTheBook,
      AboutTheAuthor: book.aboutTheAuthor,
      SampleChapters: book.sampleChapters,
      RelatedKeywords: book.relatedKeywords?.join(', '),
      RelatedSearches: book.relatedSearches?.join(', '),
      ImageLinks: book.imageLinks?.join(', '),
      Status: book.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Books');
    XLSX.writeFile(workbook, 'Books_Export.xlsx');
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5} justifyContent="space-between">
        <Typography variant="h4">Bulk Export</Typography>
        <Typography variant="h6">Total Books: {books.length}</Typography>
      </Box>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Book</InputLabel>
        <Select
          value={selectedBook}
          label="Select Book"
          onChange={(e) => setSelectedBook(e.target.value)}
        >
          {books.map((book) => (
            <MenuItem key={book._id} value={book.title}>
              {book.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          startIcon={<Iconify icon="material-symbols:download" />}
          onClick={handleExport}
          sx={{
            backgroundColor: '#4a90e2',
            '&:hover': {
              backgroundColor: '#357ab7',
            },
            borderRadius: '12px',
            padding: '10px 20px',
          }}
        >
          Export to XLSX
        </Button>
      </Box>
    </DashboardContent>
  );
}
