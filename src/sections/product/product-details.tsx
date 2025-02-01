// src/pages/book-details.tsx
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';

export default function BookDetails() {
  const location = useLocation();
  const book = location.state?.book; // Access the book data passed via state

  if (!book) {
    return <Typography variant="h6">Book not found</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        {book.title}
      </Typography>

      <Stack direction="row" spacing={4}>
        <Box
          component="img"
          src={book.imageLinks?.[0] || '/placeholder.jpg'}
          alt={book.title}
          sx={{ width: 300, height: 400, borderRadius: 2 }}
        />

        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Typography variant="h5">Authors: {book.authors?.join(', ')}</Typography>
          <Typography variant="body1">Publisher: {book.publisher}</Typography>
          <Typography variant="body1">Language: {book.language}</Typography>
          <Typography variant="body1">Pages: {book.pages}</Typography>
          <Typography variant="body1">ISBN: {book.ISBN}</Typography>
          <Typography variant="body1">
            Release Date: {new Date(book.releaseDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">Weight: {book.weight}</Typography>
          <Typography variant="body1">Dimensions: {book.dimensions}</Typography>
          <Typography variant="body1">Format: {book.format}</Typography>
          <Typography variant="body1">Status: {book.status}</Typography>
          <Typography variant="body1">
            Price: {book.currencyName} {book.sellingPrice}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">About the Book</Typography>
          <Typography variant="body1">{book.aboutTheBook}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">About the Author</Typography>
          <Typography variant="body1">{book.aboutTheAuthor}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Sample Chapters</Typography>
          <Typography variant="body1">{book.sampleChapters}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Related Keywords</Typography>
          <Typography variant="body1">{book.relatedKeywords?.join(', ')}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Rating</Typography>
          <Rating value={4.5} readOnly precision={0.5} />
        </Stack>
      </Stack>
    </Box>
  );
}
